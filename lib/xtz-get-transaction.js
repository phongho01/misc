const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");
const Utils = require("./Utils");

// const apiEndpoint = "https://api.tzkt.io";
const apiEndpoint = 'https://api.ghostnet.tzkt.io'

const _cacheBlockNumber = {
  value: 0,
  updatedAt: 0,
  isRequesting: false,
};

const getBlockCount = async () => {
  const now = Utils.nowInMillis();
  const CACHE_TIME = 10000;
  if (
    _cacheBlockNumber.value > 0 &&
    now - _cacheBlockNumber.updatedAt < CACHE_TIME
  ) {
    return _cacheBlockNumber.value;
  }

  if (_cacheBlockNumber.isRequesting) {
    await Utils.timeout(500);
    return getBlockCount();
  }

  _cacheBlockNumber.isRequesting = true;
  let blockCount;
  try {
    blockCount = (await axios.get(`${apiEndpoint}/v1/blocks/count`)).data;
  } catch (e) {
    let errMsg = "";
    if (e.response) {
      errMsg += ` status=${e.response.status} response=${JSON.stringify(
        e.response.data
      )}`;
    } else if (e.request) {
      errMsg += ` no response was received`;
    }

    throw new Error(
      `Could not get block count error=${e.toString()} info=${errMsg}`
    );
  }

  const blockNum = blockCount - 1;
  const newUpdatedAt = Utils.nowInMillis();
  _cacheBlockNumber.value = blockNum;
  _cacheBlockNumber.updatedAt = newUpdatedAt;
  _cacheBlockNumber.isRequesting = false;
  console.log(
    `XtzGateway::getBlockCount value=${blockNum} updatedAt=${newUpdatedAt}`
  );
  return blockNum;
};

const _getOneBlockWithoutTx = async (blockNumber) => {
  let cachedOneBlock;
  try {
    const blocks = (
      await axios.get(`${apiEndpoint}/v1/blocks/${blockNumber}?operations=true`)
    ).data;

    if (blocks) {
      const block = {
        number: blocks?.level,
        hash: blocks?.hash,
        timestamp: Date.parse(blocks?.timestamp) / 1000,
      };
      cachedOneBlock = block;
    }
  } catch (err) {
    console.log("XtzGateway.ts: _getOneBlock ", err);
  }
  return cachedOneBlock;
};

const getOneTransaction = async (tx) => {
  if (!tx) {
    return null;
  }

  const [block, lastNetworkBlockNumber] = await Promise.all([
    _getOneBlockWithoutTx(tx.level),
    getBlockCount(),
  ]);

  return { tx, block, lastNetworkBlockNumber };
};

const getTransactionsByIds = async (txids) => {
  const result = [];
  if (!txids || !txids.length) {
    return result;
  }

  const getOneTx = async (txid) => {
    const tx = await getOneTransaction(txid);
    if (tx) {
      result.push(tx);
    }
  };
  for (let i = 0; i < txids.length; i += 5) {
    await Utils.PromiseAll(
      txids.slice(i, i + 5).map(async (txid) => getOneTx(txid))
    );
  }

  return result;
};

const getOneBlock = async (blockNumber) => {
  const blocks = (
    await axios.get(`${apiEndpoint}/v1/blocks/${blockNumber}?operations=true`)
  ).data;

  if (blocks) {
    const txids = blocks.transactions;

    const block = {
      number: blocks?.level,
      hash: blocks?.hash,
      timestamp: Date.parse(blocks?.timestamp) / 1000,
    };
    return { ...block, txids };
  }
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

  const tokenTxs = result.filter((item) => item.tx.amount == 0);
  const otherTxs = result.filter((item) => item.tx.amount > 0);

  // fs.writeFileSync(
  //   `lib/tezos/${fromBlockNumber}-${toBlockNumber}-token.json`,
  //   JSON.stringify(tokenTxs)
  // );
  // fs.writeFileSync(
  //   `lib/tezos/${fromBlockNumber}-${toBlockNumber}-other.json`,
  //   JSON.stringify(otherTxs)
  // );
  console.log("=============== NATIVE ====================");
  console.log(
    otherTxs.map((item) => ({ hash: item.tx.hash, amount: item.tx.amount, from: item.tx.sender.address, to: item.tx.target.address  }))
  );
  console.log("================ TOKEN ===================");
  console.log(
    "TOKEN",
    tokenTxs.map((item) => item.tx.hash)
  );
  return result;
};

const FROM_BLOCK = 4726246;
const TO_BLOCK = 4726246;

getMultiBlocksTransactions(FROM_BLOCK, TO_BLOCK);
