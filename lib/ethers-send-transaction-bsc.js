const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc.getblock.io/72f3e526-767f-4055-bc12-ffeb276d7a2a/testnet"
);

const from = "0xc8429C05315Ae47FFc0789A201E5F53E93D591D4"; // Your account address 1
const to = "0x77B6ddbA6AfB1A74979011a07d078Be28f8bF835"; // Your account address 2

const privateKey =
  "0x0dfb8f0fc41906a7a5ba479c9fe5b1f4cac9fb44084a392e0003bc88e3e110f9";
const wallet = new ethers.Wallet(privateKey);

provider.getTransactionCount(from).then(async (nonce) => {
  const tx = {
    to,
    value: ethers.utils.parseEther("0.002"),
    gasLimit: 21000,
    gasPrice: ethers.utils.parseUnits("0.002", "gwei"),
    nonce,
    chainId: 97,
  };

  const signedTx = await wallet.signTransaction(tx);
  console.log("[Ethers] SignedTx: ", signedTx);
});
