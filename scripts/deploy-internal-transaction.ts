require('dotenv').config();
import { ethers, network, run, upgrades } from 'hardhat';
import fs from 'fs';

async function main() {
  const accounts = await ethers.getSigners();
  console.log('========== DEPLOY ==========');
  const BankWithInternalTransaction_Factory = await ethers.getContractFactory('BankWithInternalTransaction');
  const bankInternalTransaction = await BankWithInternalTransaction_Factory.deploy();
  console.log("Tether_Factory deployed to:", await bankInternalTransaction.getAddress());
  await bankInternalTransaction.waitForDeployment();

  console.log('========== VERIFY ==========');

  await run('verify:verify', {
    address: await bankInternalTransaction.getAddress(),
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
