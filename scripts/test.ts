require('dotenv').config();
import { ethers } from 'hardhat';

async function main() {
  console.log('========== STARTING ==========');
  const [deployer, ...accounts] = await ethers.getSigners();

  const nonce = await deployer.getTransactionCount();
  console.log('nonce', nonce);

  const txData = {
    to: '0x4F9EF07A6DDF73494D2fF51A8f7B78e9c5815eb2',
    value: ethers.utils.parseEther('0.001'),
    nonce: nonce,
    gasPrice: 1000000000,
  };

  const tx = await deployer.sendTransaction(txData);
  console.log(tx.hash, tx.gasPrice, tx.gasLimit);

  // txData.gasLimit = 42000;
  // const tx2 = await deployer.sendTransaction(txData);
  // console.log(tx2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
