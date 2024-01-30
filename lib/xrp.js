const xrpl = require("xrpl");
const Utils = require("./Utils");
const fs = require("fs");

const RPC_URL = {
  1: "wss://neat-broken-dawn.xrp-mainnet.quiknode.pro/b4b5d3f76eb50e26f16486726c7099c6b5b356d9/",
  2: "wss://xrplcluster.com/",
  3: "wss://xrpl.ws/",
  4: "wss://s1.ripple.com/",
  5: "wss://s2.ripple.com/",
};

const errors = {};
let client;

const getClient = async () => {
  client = new xrpl.Client(RPC_URL[1]);
  await client.connect();
};

const handleRpcConnection = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    if (error.name === "NotConnectedError") {
      await client.connect();
    }
    throw error;
  }
};

const getOneBlockData = async (blockNumber) => {
  const blocks = await handleRpcConnection(() =>
    client.request({
      command: "ledger",
      ledger_index: blockNumber,
      transactions: true,
    })
  );
  if (!blocks) {
    return null;
  }
  const blockDetail = blocks?.result?.ledger;
  const block = {
    number: blockDetail?.ledger_index,
    hash: blockDetail?.hash,
    timestamp: blockDetail?.close_time + 946684800, // time in ripple minus 946684800
  };

  const txids = blockDetail?.transactions?.map((tx) =>
    tx.hash ? tx.hash : tx.toString()
  );
  return { block, txids };
};

const getOneBlock = async (blockNumber) => {
  const block = await handleRpcConnection(() =>
    client.request({
      command: "ledger",
      ledger_index: blockNumber,
      transactions: true,
    })
  );
  const txids = block?.result?.ledger?.transactions;
  console.log("Block", blockNumber, "has", txids.length, "transactions");
  for (let i = 0; i < txids.length; i += 200) {
    await Utils.PromiseAll(
      txids
        .slice(i, i + 200)
        .map(async (txid) => getRawTransaction(txid, blockNumber))
    );
  }
};

const getRawTransaction = async (txid, blockNumber, retryCount = 0) => {
  try {
    const startTime = new Date().getTime();
    const tx = await handleRpcConnection(() =>
      client.request({
        command: "tx",
        transaction: txid,
      })
    );

    const block = await getOneBlockData(tx.result.ledger_index);
    return { tx: tx.result, block };
    // console.log(
    //   "COMPLETE GET RAW TRANSACTION",
    //   `with ${(new Date().getTime() - startTime) / 1000}s`
    // );
  } catch (error) {
    console.log(`Retry count ${retryCount + 1} for tx ${txid}`);
    errors[txid] = {
      retryCount,
      tx: txid,
      blockNumber,
    };
    getRawTransaction(txid, blockNumber, retryCount + 1);
  }
};

const getMultiBlocksTransactions = async (fromBlock, toBlock) => {
  for (let i = fromBlock; i <= toBlock; i++) {
    const startTime = new Date().getTime();
    console.log("===================", i, "===================");
    await getOneBlock(i);
    console.log(
      "COMPLETE PROCESS BLOCK",
      i,
      `with ${(new Date().getTime() - startTime) / 1000}s232`
    );
  }
  fs.writeFileSync("./lib/saved-data/xrp.json", JSON.stringify(errors));
};

const FROM_BLOCK = 85446800;
const TO_BLOCK = 85446859;

// getClient().then(() => {
//   getMultiBlocksTransactions(FROM_BLOCK, TO_BLOCK)
//     .then(() => {
//       process.exit(0);
//     })
//     .catch((error) => {
//       console.log("ERROR:", error);
//       process.exit(1);
//     });
// });

const getBlockHeight = async () => {
  for (let i = 0; i < 100; i++) {
    const startTime = new Date().getTime();
    await handleRpcConnection(() => client.getLedgerIndex());
    console.log(
      "COMPLETE PROCESS BLOCK",
      `with ${(new Date().getTime() - startTime) / 1000}s`
    );
  }
};

getClient().then(() => {
  getBlockHeight()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      process.exit(1);
    });
});
