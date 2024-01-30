const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");
const Utils = require("./Utils");
const txids = require("./ada-data/txids");

const blockHeaderConfig = {
  headers: {
    project_id: "mainneteHxpzwOLxT83EBF1ZCRshtfCLzTqFVRl",
  },
};

const BASE_URL = "https://cardano-mainnet.blockfrost.io/api/v0";

const getOneTransaction = async (tx) => {
  const transaction = await axios.get(
    `${BASE_URL}/txs/${tx}`,
    blockHeaderConfig
  );
  if (!transaction) {
    throw new Error(`Transaction does not exsit! ${tx}`);
  }
  let block = {
    number: transaction.data.block_height,
    timestamp: transaction.data.block_time,
    hash: transaction.data.block,
    fee: transaction.data.fees,
  };
  const transactionDetail = await axios.get(
    `${BASE_URL}/txs/${tx}/utxos`,
    blockHeaderConfig
  );

  transactionDetail.data.inputs.map((input) => {
    // if (input.amount[0].unit !== "lovelace") {
    //   console.log(input.amount[0].unit, input.amount[0].quantity);
    // }
    for (let i = 1; i < input.amount.length; i++) {
      console.log(input.amount[i].unit);
    }
  });

  transactionDetail.data.outputs.map((output) => {
    // if (output.amount[0].unit !== "lovelace") {
    //   console.log(output.amount[0].unit, output.amount[0].quantity);
    // }
    for (let i = 1; i < output.amount.length; i++) {
      console.log(output.amount[i].unit);
    }
  });

  transaction.data.inputs = transactionDetail.data.inputs;
  transaction.data.outputs = transactionDetail.data.outputs;

  return { tx: transaction.data, block };
};

const getTransactionsByIds = async (txids) => {
  if (!txids || !txids.length) {
    return result;
  }
  const result = [];

  const getOneTx = async (txid) => {
    const tx = await getOneTransaction(txid);
    if (tx) {
      result.push(tx);
    }
  };
  for (let i = 0; i < txids.length; i += 5) {
    console.log("COMPLETE PROCESS:", (i * 100) / txids.length, "%");
    await Utils.PromiseAll(
      txids.slice(i, i + 5).map(async (txid) => getOneTx(txid))
    );
  }

  return result;
};

const getOneBlock = async (blockNumber) => {
  const transaction = await axios.get(
    `${BASE_URL}/blocks/${blockNumber}`,
    blockHeaderConfig
  );
  if (!transaction) {
    throw new Error(`Transaction does not exsit! ${blockNumber}`);
  }
  let block = {
    number: transaction.data.height,
    timestamp: transaction.data.time,
    hash: transaction.data.hash,
  };
  const txids = await axios.get(
    `${BASE_URL}/blocks/${blockNumber}/txs`,
    blockHeaderConfig
  );
  return { block, txids: txids.data };
};

const getBlockTransactions = async (blockNumber) => {
  const blocks = await getOneBlock(blockNumber);

  if (!blocks) {
    // throw new Error(`Could not get information of block: ${blockNumber}`);
    return null;
  }
  let txs = await getTransactionsByIds(_.compact(blocks.txids));
  return txs;
};

const getMultiBlocksTransactions = async (fromBlockNumber, toBlockNumber) => {
  if (fromBlockNumber > toBlockNumber) {
    throw new Error(`fromBlockNumber must be less than toBlockNumber`);
  }

  const count = toBlockNumber - fromBlockNumber + 1;
  const blockNumbers = Array.from(
    new Array(count),
    (val, index) => index + fromBlockNumber
  );
  const result = [];
  await Promise.all(
    blockNumbers.map(async (blockNumber) => {
      const txs = await getBlockTransactions(blockNumber);
      if (txs) {
        const transactions = _.compact(txs);
        result.push(...transactions);
      }
    })
  );
  console.log("=============== txs ===================");
  console.log(result);
  fs.writeFileSync(
    `lib/ada-data/${fromBlockNumber} - ${toBlockNumber}.json`,
    JSON.stringify(result)
  );
};

const FROM_BLOCK = 9662080;
const TO_BLOCK = FROM_BLOCK;

// getMultiBlocksTransactions(FROM_BLOCK, TO_BLOCK);

getTransactionsByIds(txids.flat())
  .then(() => {
    console.log("DONE");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
