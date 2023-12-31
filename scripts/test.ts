require('dotenv').config();
import { ethers } from 'hardhat';
import { randomIntFromInterval } from './deploy-lol-team';
import ERC20JSON from '../artifacts/contracts/Tether.sol/Tether.json'

const ONE_GWEI = ethers.utils.parseUnits('1', 9);
const BASE_URI = 'https://chonksociety.s3.us-east-2.amazonaws.com/metadata/';

async function main() {
  console.log('========== STARTING ==========');
  const [deployer, ...accounts] = await ethers.getSigners();
  console.log('deployer', deployer.address);

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

  // const leagueOfLegends = await ethers.getContractFactory('LeagueOfLegends');
  // const LoL = await leagueOfLegends.deploy(BASE_URI, "Invictus Gaming", "IG");
  // console.log('LoL', LoL.address);
  // await LoL.deployed();
  // LoL: 0x9b42ed936c5fedf3ca20a2d97322531b1398412f
  // LoL 2: 0x8605d5087dD2EE45C747b089bb6bC48c66fD3B81
  // lil pudgys:
  // const LoL = leagueOfLegends.attach("0x7e9165140eE94Fd020AD48aAAA2A5F3852838758");

  // const tx = await LoL.connect(deployer).mint(deployer.address, 3);
  // const tx = await LoL.connect(deployer).transferFrom(deployer.address, "0x0000000000000000000000000000000000000000", 8);

  // console.log(tx.hash);
  // await tx.wait();
  // await LoL.connect(deployer).burn(1);

  // const ERC20 = await ethers.getContractFactory("LiteCoin");

  // const erc20Addresses = ['0x985F6AC9BA18C97CE59C1334DF716074EF02A684', '0x9EAEF20D024F7C2AD9461CB6543B845C286B5CB7']
  // for(let i = 0; i < erc20Addresses.length; i++) {
  //   const erc20 = ERC20.attach(erc20Addresses[i])
  //   console.log(erc20Addresses[i], await erc20.name())
  // }

  // const tx = {
  //   to: '0xbf4e57eA10b8D19Ad436293818469758145ee915',
  //   value: ethers.utils.parseEther('0.00000001'),
  //   gasPrice: 125000000
  // }

  // const tx2 = await deployer.sendTransaction(tx);
  // console.log(tx2.hash)

  // tx.to = '0xC2794C7Ddc594eEFDF792d420941b8490F5ff3C8'
  // tx.gasPrice = 1500000000;

  // await deployer.sendTransaction(tx);

  // tx.to = '0x6e471EEd9e30A2614B69801Ff2bb470f58682dAB'
  // tx.gasPrice = 130000000;

  // await deployer.sendTransaction(tx);

  const Tether = await ethers.getContractFactory('Tether');
  const tether = Tether.attach("0x3946b20e3edf732627bbab7d4e33133e6a6f20e9");
  const tx = await tether.mint("0x2221C6C1dd592b9dffCeA63F5199F99B900C486b", ethers.utils.parseUnits('368', 18))
  console.log(tx.hash)
  // console.log(await tether.balanceOf("0xb2979a091059735a26ab8dc189230072f878d873"))
  // const tether = await Tether.deploy();
  // console.log('tether', tether.address);
  // await tether.deployed();

  // console.log(await tether.balanceOf("0x2d109e2eb5093e5ac83cc856bbe9d79e745b4dc0"))


  // const tx = await tether.connect(deployer).mint(deployer.address, 1000);
  console.log('tx', await tether.balanceOf("0xc8429C05315Ae47FFc0789A201E5F53E93D591D4"));
  console.log('tx', await tether.name())
  // await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
