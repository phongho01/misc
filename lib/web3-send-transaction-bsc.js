const Web3 = require("web3");
const web3 = new Web3(
  "https://bsc.getblock.io/72f3e526-767f-4055-bc12-ffeb276d7a2a/testnet"
);
const Common = require("@ethereumjs/common").default;
const { Transaction } = require("@ethereumjs/tx");

const from = "0xc8429C05315Ae47FFc0789A201E5F53E93D591D4"; // Your account address 1
const to = "0x77B6ddbA6AfB1A74979011a07d078Be28f8bF835"; // Your account address 2

const secret =
  "0dfb8f0fc41906a7a5ba479c9fe5b1f4cac9fb44084a392e0003bc88e3e110f9";

const common = Common.custom({ chainId: Number(97) });

web3.eth.getTransactionCount(from, (err, txCount) => {
  // Build the transaction
  const txParams = {
    nonce: web3.utils.toHex(txCount + 1),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    gasLimit: web3.utils.toHex(21000),
    to,
    value: web3.utils.toHex(web3.utils.toWei("0.002", "ether")),
    data: "0x",
  };

  const tx = new Transaction(txParams, { common });
  const unsignedRaw = tx.serialize().toString("hex");
  console.log("unsignedRaw", unsignedRaw);

  const ethTx = Transaction.fromSerializedTx(Buffer.from(unsignedRaw, "hex"), {
    common,
  });
  const privateKey = Buffer.from(secret, "hex");
  const signedTx = ethTx.sign(privateKey);
  // const signedRaw = signedTx.serialize().toString("hex");
  const signedRaw =
    "f86c808505d21dba00830249f094c8429c05315ae47ffc0789a201e5f53e93d591d4865af3107a40008081e6a09685c55292403198b40098cd698f37d3443afd2d27672e120f3d717a7d72d3c5a031608a216a0ab994dd1bce582ac91799f32ffc3d0a8e21164d77d6a31ed27f59";

  console.log("signedRaw", signedRaw);
  //   Broadcast the transaction
  web3.eth.sendSignedTransaction("0x" + signedRaw).on("receipt", console.log);
});
