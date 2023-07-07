import { ethers, network, run } from 'hardhat';
import fs from 'fs';

const BASE_URI = 'https://chonksociety.s3.us-east-2.amazonaws.com/metadata/';

async function main() {
  console.log('========== DEPLOY ==========');

  const Bank_factory = await ethers.getContractFactory('Bank');
  const bank = await Bank_factory.deploy();
  await bank.deployed();

  console.log('bank', bank.address);

  const Tether = await ethers.getContractFactory('Tether');
  const tether = await Tether.deploy();
  await tether.deployed();

  console.log('tether', tether.address);

  const ChonkSociety = await ethers.getContractFactory('ChonkSociety');
  const chonk = await ChonkSociety.deploy(BASE_URI);
  await chonk.deployed();

  console.log('chonk', chonk.address);

  const contracts = {
    bank: bank.address,
    tether: tether.address,
    chonk: chonk.address,
  };
  
  fs.writeFileSync(`deployed/${network.name}.json`, JSON.stringify(contracts));

  console.log('========== VERIFY ==========');
  await run('verify:verify', {
    address: bank.address,
    constructorArguments: [],
  });

  await run('verify:verify', {
    address: tether.address,
    constructorArguments: [],
  });

  await run('verify:verify', {
    address: chonk.address,
    constructorArguments: [BASE_URI],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
