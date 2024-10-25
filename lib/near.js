const { KeyPairEd25519 } = require("near-api-js/lib/utils");
const nearAPI = require("near-api-js");
const BN = require("bn.js");

const provider = new nearAPI.providers.JsonRpcProvider({
  url: "https://archival-rpc.mainnet.near.org/",
});

const nowNodeProvider = new nearAPI.providers.JsonRpcProvider({
  url: "https://near.nownodes.io",
  headers: { "api-key": "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv" },
});

const run = async (txid, masterAccountID) => {
  try {
    const startTime = Date.now();
    const rawTx = await provider.txStatus(txid, masterAccountID);
    const endTime = Date.now();
    console.log("time 1", (endTime - startTime) / 1000);
    const rawTx2 = await nowNodeProvider.txStatus(txid, masterAccountID);
    const endTime2 = Date.now();
    console.log("time 2", (endTime2 - endTime) / 1000);
    // const txOutcome = rawTx.transaction_outcome;
    // const txOutcome2 = rawTx2.transaction_outcome;
    // // console.log({ txOutcome, txOutcome2 });
  } catch (error) {
    console.error("error", error);
  }
};

run("Cvu6vthCQoytp8AWviC9yh5FknG5TXLC7LZRgTRTzsJU", "x-wallet.near");