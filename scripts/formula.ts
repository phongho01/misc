require('dotenv').config();
import { ethers } from 'hardhat';

async function main() {
  console.log('========== DEPLOY ==========');
  const Formula = await  ethers.getContractFactory('Formula');
  const formula = await Formula.deploy();
  await formula.deployed();

  console.log("formula", formula.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
