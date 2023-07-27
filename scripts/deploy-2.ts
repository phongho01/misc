require('dotenv').config();
import { ethers, network, run } from 'hardhat';
import fs from 'fs';

async function main() {
  const accounts = await ethers.getSigners();
  console.log('========== DEPLOY ==========');

  const Bank_factory = await ethers.getContractFactory('BankWithInternalTransaction');
  const bank = Bank_factory.attach('0x3158bDBb1aF0bC54A539cABFB5aa709394457c2F');
  // const bank = await Bank_factory.deploy();
  // console.log('bank with internal transaction ===>', bank.address);
  // await bank.deployed();
  // console.log(tx);
  // const tx = await bank.connect(accounts[0]).transfer('0x77B6ddbA6AfB1A74979011a07d078Be28f8bF835', { value: ethers.utils.parseEther('0.001') });
  // const tx = await bank.connect(accounts[0]).airdrop(['0x77B6ddbA6AfB1A74979011a07d078Be28f8bF835', '0xc8429C05315Ae47FFc0789A201E5F53E93D591D4'], { value: ethers.utils.parseEther('0.0002') });
  // const tx = await bank.connect(accounts[0]).deposit({ value: ethers.utils.parseEther('0.001') });
  const tx = await bank.connect(accounts[0]).withdraw(ethers.utils.parseEther('0.001'));
  console.log('tx', tx);

  // const bank = Bank_factory.attach('0xAE506Ec5EEa42EAb2Dc94d7d04E2B32549E59dF4');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
