require('dotenv').config();
import { ethers } from 'hardhat';

const TOKEN_1 = ethers.parseUnits('1', 18);

async function main() {
  const accounts = await ethers.getSigners();
  console.log('========== DEPLOY ==========');
  const EvelynStarlight_Factory = await ethers.getContractFactory('EvelynStarlight');
  // const evelynStarlight = await EvelynStarlight_Factory.deploy('Evelyn Starlight', 'eStar', TOKEN_1 * BigInt(10000000));
  // console.log("EvelynStarlight deployed to:", await evelynStarlight.getAddress());

  const evelynStarlight = EvelynStarlight_Factory.attach("0x04f0d6a2c821EECE7BD2245988681F3799a540E0");
  await evelynStarlight.airdrop(['0x4C4296f8532D79D9B2e9257f6A032B41C05C1273', '0x064Eb4F61340d9e4dD5f78D79006CE51b29f5a3f'],  TOKEN_1 * BigInt(13))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
