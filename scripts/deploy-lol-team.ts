require('dotenv').config();
import { ethers } from 'hardhat';
import fs from 'fs';
import { LEC } from '../data/LoLTeam';

const ONE_GWEI = ethers.utils.parseUnits('1', 9);

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  console.log('========== STARTING ==========');
  const accounts = await ethers.getSigners();
  console.log(
    'deployer',
    accounts.map(account => account.address)
  );

  const fileName = `deployed/LoLTeamAddress.json`;

  // console.log('========== DEPLOY ==========');
  // const teamAddress: Record<string, any> = JSON.parse(fs.readFileSync(`deployed/LoLTeamAddress.json`, { encoding: 'utf8', flag: 'r' }));
  // teamAddress.LEC = {};

  // const teamNames = Object.keys(LEC);

  // for (let i = 1; i < teamNames.length; i++) {
  //   const { name, symbol, baseURI } = LEC[teamNames[i]];
  //   const Team = await ethers.getContractFactory(teamNames[i]);
  //   const team = await Team.deploy(baseURI, name, symbol);
  //   console.log(name, team.address);
  //   teamAddress.LEC[name] = team.address;
  //   await team.deployed();
  //   const tx = await team.connect(accounts[randomIntFromInterval(0, 3)]).mint(accounts[randomIntFromInterval(0, 3)].address, randomIntFromInterval(3, 5));
  //   console.log(tx.hash);
  // }

  // console.log('========== WRITE FILE ==========');

  // fs.writeFileSync(fileName, JSON.stringify(teamAddress));


  console.log('========== ATTACHING ==========');
  const teamAddress: Record<string, any> = JSON.parse(fs.readFileSync(`deployed/LoLTeamAddress.json`, { encoding: 'utf8', flag: 'r' }));
  // attach smart contract
  const lolTeamAddress: string[] = Object.values(teamAddress).map(Object.values).flat();
  for (let i = 0; i < lolTeamAddress.length; i++) {
    const Team = await ethers.getContractFactory('T1');
    const team = Team.attach(lolTeamAddress[i]);
    const tx = await team.connect(accounts[randomIntFromInterval(0, 3)]).mint(accounts[randomIntFromInterval(0, 3)].address, randomIntFromInterval(3, 10));
    console.log(tx.hash);
  }

  const userAddresses = [
    '0xF474Cf03ccEfF28aBc65C9cbaE594F725c80e12d',
    '0xaa25Aa7a19f9c426E07dee59b12f944f4d9f1DD3',
    '0x33a8f831748F483324e06eCAe4215cF98FaE3864',
    '0xaa25aa7a19f9c426e07dee59b12f944f4d9f1dd3',
    '0xfe009c8a2cb0ea3fa48db73b5d9758dbd35c78d1'
  ]

  for(let i = 0; i < userAddresses.length; i++) {
    const txInfo = {
      to: userAddresses[i],
      value: ethers.utils.parseEther('0.000000000000001')
    }
    const tx = await accounts[randomIntFromInterval(0, 3)].sendTransaction(txInfo)
    console.log(tx.hash);
  }

  console.log('========== ENDING ==========');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
