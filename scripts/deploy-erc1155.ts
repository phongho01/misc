require('dotenv').config();
import { ethers, network, run } from 'hardhat';
import fs from 'fs';

async function main() {
  const accounts = await ethers.getSigners();

  const ERC1155_Factory = await ethers.getContractFactory('LilPudgys');
  // const lite = ERC20_Factory.attach("0xCd16D2bEc41493bCcD20ee78a3363AC294959643");
  const erc1155 = await ERC1155_Factory.deploy();
  console.log('erc1155', erc1155.address);
  await erc1155.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
