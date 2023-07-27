require('dotenv').config();
import { ethers, network, run } from 'hardhat';
import fs from 'fs';

async function main() {
  const accounts = await ethers.getSigners();
  console.log('========== DEPLOY ==========');

  const ERC20_Factory = await ethers.getContractFactory('LiteCoin');
  const erc20 = await ERC20_Factory.deploy();
  await erc20.deployed();
  console.log('ERC20 address ===>', erc20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
