require('dotenv').config();
import { ethers, network, run } from 'hardhat';
import fs from 'fs';

async function main() {
  const accounts = await ethers.getSigners();
  console.log('========== DEPLOY ==========');

  // const ERC20_Factory = await ethers.getContractFactory('LiteCoin');
  // const lite = await ERC20_Factory.deploy();
  // await lite.deployed();
  // console.log('lite', lite.address);
  // const tx = await lite.connect(accounts[0]).mint(accounts[0].address, ethers.utils.parseUnits('10', 18));
  // await tx.wait();

  // const dai = await ERC20_Factory.deploy();
  // console.log('dai', dai.address);
  // await dai.deployed();

  // const tx2 = await lite.connect(accounts[0]).swap(dai.address, ethers.utils.parseUnits('5', 18));
  // console.log(tx2);
  // await run('verify:verify', {
  //   address: erc20.address,
  //   constructorArguments: [],
  // });

  const ERC20_Factory = await ethers.getContractFactory('Tether');
  const tether = ERC20_Factory.attach('0xdC7684bCf06eEfBD2B0d941250D567ea7ACDBDf1');
  // const tether = await ERC20_Factory.deploy();
  // console.log('tether', tether.address);
  // await tether.deployed();
  const tx = await tether.connect(accounts[0]).rewardToStudent('Blockchain development', ethers.utils.parseUnits('20', 18), ethers.utils.parseUnits('1', 18));
  console.log(tx.hash);

  // await run('verify:verify', {
  //   address: "0xdC7684bCf06eEfBD2B0d941250D567ea7ACDBDf1",
  //   constructorArguments: [],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
