require('dotenv').config();
import { ethers, network, run } from 'hardhat';
import fs from 'fs';

const BASE_URI = 'https://chonksociety.s3.us-east-2.amazonaws.com/metadata/';

const CONTRACT_TYPES = {
  BANK_SINGLE_FILE: 'bank-single-file',
  BANK_MULTIPLE_FILE: 'bank-multiple-file',
  TETHER: 'tether',
  NFT: 'nft',
};

async function main() {
  console.log('========== DEPLOY ==========');

  switch (process.env.CONTRACT_TYPE) {
    case CONTRACT_TYPES.BANK_SINGLE_FILE: {
      const Bank_factory = await ethers.getContractFactory('Bank');
      const bank = await Bank_factory.deploy();
      console.log('bank contract ===>', bank.address);
      await bank.deployed();

      break;
    }

    case CONTRACT_TYPES.BANK_MULTIPLE_FILE: {
      const Bank_factory = await ethers.getContractFactory('BankMultipleFile');
      const bank = await Bank_factory.deploy();
      console.log('bank multiple file contract ===>', bank.address);
      await bank.deployed();

      break;
    }

    case CONTRACT_TYPES.TETHER: {
      const Tether = await ethers.getContractFactory('Tether');
      const tether = await Tether.deploy();
      console.log('tether', tether.address);
      await tether.deployed();

      break;
    }

    case CONTRACT_TYPES.NFT: {
      const ChonkSociety = await ethers.getContractFactory('ChonkSociety');
      const chonk = await ChonkSociety.deploy('https://nft.blockgames.com/dice/');
      console.log('chonk', chonk.address);
      await chonk.deployed();

      break;
    }
  }

  // const contracts = {
  //   bank: bank.address,
  //   tether: tether.address,
  //   chonk: chonk.address,
  // };

  // fs.writeFileSync(`deployed/${network.name}.json`, JSON.stringify(contracts));

  // console.log('========== VERIFY ==========');
  // await run('verify:verify', {
  //   address: '0xdB6B515d739da37F554478fe7E67F8681f5a50EC',
  //   constructorArguments: [],
  // });

  // await run('verify:verify', {
  //   address: tether.address,
  //   constructorArguments: [],
  // });

  // await run('verify:verify', {
  //   address: chonk.address,
  //   constructorArguments: [BASE_URI],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
