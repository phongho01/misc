import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Bank } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

let bank: Bank;
let accounts: SignerWithAddress[];

const ETHER_1 = ethers.utils.parseEther('1');

describe('Bank', () => {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const Bank = await ethers.getContractFactory('Bank');
    bank = await Bank.deploy();
    await bank.deployed();
  });

  describe('deposit', () => {
    it('should revert with invalid value', async () => {
      await expect(bank.connect(accounts[0]).deposit()).to.revertedWith('Invalid value');
    });

    it('should deposit successfully', async () => {
      await expect(
        bank.connect(accounts[0]).deposit({
          value: ETHER_1,
        })
      )
        .to.emit(bank, 'Deposited')
        .withArgs(accounts[0].address, ETHER_1)
        .to.changeEtherBalances([bank.address, accounts[0].address], [ETHER_1, ETHER_1.mul(-1)]);
      expect(await bank.balanceOf(accounts[0].address)).to.equal(ETHER_1);

      await expect(
        bank.connect(accounts[0]).deposit({
          value: ETHER_1.mul(2),
        })
      )
        .to.emit(bank, 'Deposited')
        .withArgs(accounts[0].address, ETHER_1.mul(2))
        .to.changeEtherBalances([bank.address, accounts[0].address], [ETHER_1.mul(2), ETHER_1.mul(-2)]);
      expect(await bank.balanceOf(accounts[0].address)).to.equal(ETHER_1.mul(3));
    });
  });

  describe('withdraw', () => {
    beforeEach(async () => {
      await bank.connect(accounts[0]).deposit({
        value: ETHER_1.mul(5),
      });
    });

    it('should revert with balance is not enough', async () => {
      await expect(bank.connect(accounts[0]).withdraw(ETHER_1.mul(5).add(1))).to.revertedWith('Balance is not enough');
    });

    it('should withdraw successfully', async () => {
      await expect(bank.connect(accounts[0]).withdraw(ETHER_1))
        .to.emit(bank, 'Withdrawn')
        .withArgs(accounts[0].address, ETHER_1)
        .to.changeEtherBalances([bank.address, accounts[0].address], [ETHER_1.mul(-1), ETHER_1]);
      expect(await bank.balanceOf(accounts[0].address)).to.equal(ETHER_1.mul(4));

      await expect(bank.connect(accounts[0]).withdraw(ETHER_1.mul(2)))
        .to.emit(bank, 'Withdrawn')
        .withArgs(accounts[0].address, ETHER_1.mul(2))
        .to.changeEtherBalances([bank.address, accounts[0].address], [ETHER_1.mul(-2), ETHER_1.mul(2)]);
      expect(await bank.balanceOf(accounts[0].address)).to.equal(ETHER_1.mul(2));
    });
  });

  describe('transfer', () => {
    beforeEach(async () => {
      await bank.connect(accounts[0]).deposit({
        value: ETHER_1.mul(5),
      });

      await bank.connect(accounts[1]).deposit({
        value: ETHER_1.mul(10),
      });
    });

    it('should revert with balance is not enough', async () => {
      await expect(bank.connect(accounts[1]).transfer(accounts[0].address, ETHER_1.mul(10).add(1))).to.revertedWith('Balance is not enough');
    });

    it('should revert with can not transfer to yourself', async () => {
      await expect(bank.connect(accounts[1]).transfer(accounts[1].address, ETHER_1)).to.revertedWith('Can not transfer to yourself');
      await expect(bank.connect(accounts[0]).transfer(accounts[0].address, ETHER_1)).to.revertedWith('Can not transfer to yourself');
    });

    it('should transfer successfully', async () => {
      await expect(bank.connect(accounts[1]).transfer(accounts[0].address, ETHER_1.mul(3))).to.emit(bank, 'Transferred');
      expect(await bank.balanceOf(accounts[0].address)).to.equal(ETHER_1.mul(8));
      expect(await bank.balanceOf(accounts[1].address)).to.equal(ETHER_1.mul(7));

      await expect(bank.connect(accounts[0]).transfer(accounts[1].address, ETHER_1)).to.emit(bank, 'Transferred');
      expect(await bank.balanceOf(accounts[0].address)).to.equal(ETHER_1.mul(7));
      expect(await bank.balanceOf(accounts[1].address)).to.equal(ETHER_1.mul(8));
    });
  });
});
