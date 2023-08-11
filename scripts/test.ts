require('dotenv').config();
import { ethers } from 'hardhat';

const ONE_GWEI = ethers.utils.parseUnits('1', 9);
const BASE_URI = 'https://chonksociety.s3.us-east-2.amazonaws.com/metadata/';

async function main() {
  console.log('========== STARTING ==========');
  const [deployer, ...accounts] = await ethers.getSigners();
  console.log('deployer', deployer.address)

  // const nonce = await deployer.getTransactionCount();
  // console.log('nonce', nonce);

  // const Bank_factory = await ethers.getContractFactory('Bank');
  // const bank = await Bank_factory.deploy();

  // console.log('hash 1 ===>', bank.address, bank.deployTransaction.hash);

  // const txData = {
  //   to: '0x4F9EF07A6DDF73494D2fF51A8f7B78e9c5815eb2',
  //   value: ethers.utils.parseEther('0.0001'),
  //   nonce: nonce,
  //   gasPrice: ONE_GWEI.mul(1),
  // };

  // const tx1 = await deployer.sendTransaction(txData);
  // console.log('hash 1 ===>', tx1.hash);

  // txData.gasPrice = ONE_GWEI.mul(2)

  // const tx2 = await deployer.sendTransaction(txData);
  // console.log('hash 2 ===>', tx2.hash);

  const leagueOfLegends = await ethers.getContractFactory('LeagueOfLegends');
  // const LoL = await leagueOfLegends.deploy(BASE_URI);
  // console.log('LoL', LoL.address);
  // await LoL.deployed();
  // LoL: 0x9b42ed936c5fedf3ca20a2d97322531b1398412f
  // LoL 2: 0x8605d5087dD2EE45C747b089bb6bC48c66fD3B81
  // lil pudgys:
  const LoL = leagueOfLegends.attach("0x7e9165140eE94Fd020AD48aAAA2A5F3852838758");

  const tx = await LoL.connect(deployer).mint(deployer.address, 3);
  // const tx = await LoL.connect(deployer).transferFrom(deployer.address, "0x0000000000000000000000000000000000000000", 8);

  
  // console.log(tx.hash);
  // await tx.wait();
  await LoL.connect(deployer).burn(1);

  // const ERC20 = await ethers.getContractFactory("LiteCoin");
  // const erc20 = ERC20.attach("0x603c668fd2dd8477b755f43c9ccac6a409684717")
  // console.log(await erc20.totalSupply())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
