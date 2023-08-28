require('dotenv').config();
import { ethers } from 'hardhat';
import fs from 'fs';
import { LPL } from '../data/LoLTeam';

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

  const teamAddress: Record<string, any> = JSON.parse(fs.readFileSync(`deployed/LoLTeamAddress.json`, { encoding: 'utf8', flag: 'r' }));
  teamAddress.LPL = {};

  const teamNames = Object.keys(LPL);

  for (let i = 1; i < teamNames.length; i++) {
    const { name, symbol, baseURI } = LPL[teamNames[i]];
    const Team = await ethers.getContractFactory(teamNames[i]);
    const team = await Team.deploy(baseURI, name, symbol);
    console.log(name, team.address);
    teamAddress.LPL[name] = team.address;
    await team.deployed();
    const tx = await team.connect(accounts[randomIntFromInterval(0, 3)]).mint(accounts[randomIntFromInterval(0, 3)].address, randomIntFromInterval(3, 10));
    console.log(tx.hash);
  }

  // const fileName = `deployed/LoLTeamAddress.json`;
  // fs.writeFileSync(fileName, JSON.stringify(teamAddress));

  // attach smart contract
  // const lolTeamAddress: string[] = Object.values(teamAddress).map(Object.values).flat();
  // for (let i = 0; i < lolTeamAddress.length; i++) {
  //   const Team = await ethers.getContractFactory('T1');
  //   const team = Team.attach(lolTeamAddress[i]);
  //   const tx = await team.connect(accounts[randomIntFromInterval(0, 3)]).mint(accounts[randomIntFromInterval(0, 3)].address, randomIntFromInterval(3, 10));
  //   console.log(tx.hash);
  // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
