import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Tether } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

let tether: Tether;
let accounts: SignerWithAddress[];

const TOKEN_1 = ethers.utils.parseUnits('1', 18);

describe.only('ERC20', () => {
  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const ERC20_Factory = await ethers.getContractFactory('Tether');
    tether = await ERC20_Factory.deploy();
    await tether.deployed();

    await tether.mint(accounts[0].address, TOKEN_1.mul(100));
  });

  describe('functions', () => {
    it('creator course', async () => {
      await expect(tether.connect(accounts[0]).createCourse('Web development', TOKEN_1.mul(50), TOKEN_1))
        .to.emit(tether, 'CreatedCourse')
        .to.changeTokenBalances(tether, [tether.address, accounts[0].address], [TOKEN_1.mul(50), TOKEN_1.mul(-50)]);
    });

    it('add budget', async () => {
      await tether.connect(accounts[0]).createCourse('Web development', TOKEN_1.mul(50), TOKEN_1);
      await expect(tether.connect(accounts[0]).addBudget(1, TOKEN_1.mul(10)))
        .to.emit(tether, 'AddedBudget')
        .to.changeTokenBalances(tether, [tether.address, accounts[0].address], [TOKEN_1.mul(10), TOKEN_1.mul(-10)]);
    });

    it('rewardToStudent', async () => {
      await tether.connect(accounts[0]).createCourse('Web development', TOKEN_1.mul(50), TOKEN_1);
      await expect(tether.connect(accounts[0]).rewardToStudent(1, accounts[1].address))
        .to.emit(tether, 'RewardedToStudent')
        .to.changeTokenBalances(tether, [tether.address, accounts[1].address], [TOKEN_1.mul(-1), TOKEN_1.mul(1)]);
    });

    it('withdrawBudgetCourse', async () => {
      await tether.connect(accounts[0]).createCourse('Web development', TOKEN_1.mul(50), TOKEN_1);
      await tether.connect(accounts[0]).rewardToStudent(1, accounts[1].address);

      await expect(tether.connect(accounts[0]).withdrawBudgetCourse(1, TOKEN_1.mul(20)))
        .to.emit(tether, 'WithdrawnBudgetCourse')
        .to.changeTokenBalances(tether, [tether.address, accounts[0].address], [TOKEN_1.mul(-20), TOKEN_1.mul(20)]);
    });
  });
});
