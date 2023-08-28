require('dotenv').config();
import { ethers, network, run } from 'hardhat';
import fs from 'fs';

async function main() {
  const accounts = await ethers.getSigners();
  // console.log('========== DEPLOY ==========');

  // const tx = {
  //   value: ethers.utils.parseEther('0.0001'),
  //   to: ethers.constants.AddressZero,
  //   type: 0,
  // };

  // const signedTx = await accounts[0].sendTransaction(tx);
  // console.log(signedTx);

  // const ERC20_Factory = await ethers.getContractFactory('LiteCoin');
  // const lite = await ERC20_Factory.deploy("LiteCoin", "LTC");
  // await lite.deployed();
  // console.log('lite', lite.address);
  // const tx = await lite.connect(accounts[0]).mint(accounts[0].address, ethers.utils.parseUnits('10', 18));
  // await tx.wait();

  // const dai = await ERC20_Factory.deploy("Dai", "DAI");
  // console.log('dai', dai.address);
  // await dai.deployed();

  // const tx2 = await lite.connect(accounts[0]).swap(dai.address, '0x4F9EF07A6DDF73494D2fF51A8f7B78e9c5815eb2', ethers.utils.parseUnits('5', 18), {
  //   value: ethers.utils.parseEther('0.0001')
  // });
  // console.log(tx2);
  // await run('verify:verify', {
  //   address: dai.address,
  //   constructorArguments: ["Dai", "DAI"],
  // });

  // await run('verify:verify', {
  //   address: lite.address,
  //   constructorArguments: ["LiteCoin", "LTC"],
  // });

  // const UserBalance = await ethers.getContractFactory('UserBalance');
  // const userBalance = await UserBalance.deploy();
  // console.log('userBalance', userBalance.address);
  // await userBalance.deployed();

  // const ERC20_Factory = await ethers.getContractFactory('LiteCoin');
  // const lite = ERC20_Factory.attach("0x27b99427b2d5762c3c585aa95A450871Dcd88fBC");
  // const lite = await ERC20_Factory.deploy('LiteCoin', 'LTC', userBalance.address);
  // console.log('lite', lite.address);
  // await lite.deployed();
  // const tx = await lite.connect(accounts[0]).mint(accounts[0].address, ethers.utils.parseUnits('10', 18));
  // await tx.wait();
  // console.log(tx);

  // const tx2 = await lite.connect(accounts[0]).mint(accounts[0].address, ethers.utils.parseUnits('10', 18));
  // await tx2.wait();
  // console.log(tx2);
  // const tx2 = await lite.connect(accounts[0]).airdrop(["0x4F9EF07A6DDF73494D2fF51A8f7B78e9c5815eb2", "0xbf4e57eA10b8D19Ad436293818469758145ee915", "0x475DadD02b62698b8a3CE58dFbF5b05168A7A1dB"], ethers.utils.parseUnits("1"))
  // console.log(tx2);

  const Tether = await ethers.getContractFactory('Tether');
  // const tether = Tether.attach("0x6dB1C99c931C372F73cA17F47B0ed7b856eE9ccE");
  // console.log(await tether.balanceOf("0xb2979a091059735a26ab8dc189230072f878d873"))
  const tether = await Tether.deploy();
  console.log('tether', tether.address);
  await tether.deployed();

  // console.log(await tether.balanceOf("0x2d109e2eb5093e5ac83cc856bbe9d79e745b4dc0"))

  const tx = await tether.connect(accounts[0]).mint(accounts[0].address, ethers.utils.parseUnits('10', 18));
  console.log('tx', tx);
  await tx.wait();

  const tx2 = await tether.connect(accounts[0]).createCourse("Web Development", ethers.utils.parseUnits('10'), ethers.utils.parseUnits('0.1'))
  console.log(tx2.hash)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
