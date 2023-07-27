import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Bank, LiteCoin } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

let liteCoin: LiteCoin;
let daiCoin: LiteCoin;
let accounts: SignerWithAddress[];

const TOKEN_1 = ethers.utils.parseUnits('1', 18);

describe('ERC20', () => {
  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const ERC20_Factory = await ethers.getContractFactory('LiteCoin');
    liteCoin = await ERC20_Factory.deploy();
    await liteCoin.deployed();

    daiCoin = await ERC20_Factory.deploy();
    await daiCoin.deployed();

    await liteCoin.mint(accounts[0].address, TOKEN_1.mul(100));
    await daiCoin.mint(accounts[0].address, TOKEN_1.mul(100));
  });

  describe('functions', () => {
    it('airdrop', async () => {
      await expect(liteCoin.connect(accounts[0]).airdrop(accounts[1].address, TOKEN_1)).to.changeTokenBalances(liteCoin, [accounts[0].address, accounts[1].address], [TOKEN_1.mul(-1), TOKEN_1]);
    });

    it('swap', async () => {
      await expect(liteCoin.connect(accounts[0]).swap(daiCoin.address, TOKEN_1))
        .to.changeTokenBalances(liteCoin, [accounts[0].address], [TOKEN_1.mul(-1)])
        .to.changeTokenBalances(daiCoin, [accounts[0].address], [TOKEN_1]);
    });

    it('buy', async () => {
      await expect(liteCoin.connect(accounts[0]).buy({ value: TOKEN_1 }))
        .to.changeTokenBalances(liteCoin, [accounts[0].address], [TOKEN_1.mul(1000)])
        .to.changeEtherBalances([liteCoin.address, accounts[0].address], [TOKEN_1, TOKEN_1.mul(-1)]);
    });

    it('sell', async () => {
      await liteCoin.connect(accounts[0]).buy({ value: TOKEN_1 });
      await expect(liteCoin.connect(accounts[0]).sell(TOKEN_1.mul(100)))
        .to.changeTokenBalances(liteCoin, [accounts[0].address], [TOKEN_1.mul(-100)])
        .to.changeEtherBalances([liteCoin.address, accounts[0].address], [TOKEN_1.mul(-1).div(10), TOKEN_1.mul(1).div(10)]);
    });

    it('lock', async () => {
      await expect(liteCoin.connect(accounts[0]).lockToken(TOKEN_1)).to.changeTokenBalances(liteCoin, [liteCoin.address, accounts[0].address], [TOKEN_1, TOKEN_1.mul(-1)]);
    });

    it('unlock', async () => {
      await liteCoin.connect(accounts[0]).lockToken(TOKEN_1);
      await expect(liteCoin.connect(accounts[0]).unlockToken(TOKEN_1)).to.changeTokenBalances(liteCoin, [liteCoin.address, accounts[0].address], [TOKEN_1.mul(-1), TOKEN_1]);
    });

    it('claimRewards', async () => {
      await expect(liteCoin.connect(accounts[0]).claimRewards()).to.changeTokenBalances(liteCoin, [accounts[0].address], [TOKEN_1]);
    });

    it('stake', async () => {
      await expect(liteCoin.connect(accounts[0]).stake(TOKEN_1)).to.changeTokenBalances(liteCoin, [liteCoin.address, accounts[0].address], [TOKEN_1, TOKEN_1.mul(-1)]);
    });

    it('unStake', async () => {
      await liteCoin.connect(accounts[0]).stake(TOKEN_1);
      await expect(liteCoin.connect(accounts[0]).unStake()).to.changeTokenBalances(liteCoin, [liteCoin.address, accounts[0].address], [TOKEN_1.mul(-1), TOKEN_1.mul(2)]);
    });
  });
});
