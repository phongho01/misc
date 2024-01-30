import fs from "fs";
import _ from "lodash";
import * as Antenna from "iotex-antenna";

console.log('Antenna', typeof Antenna)

const antenna = new Antenna("https://api.mainnet.iotex.one:443");

const getTransactionsByIds = async (txids) => {
  const result = new Transactions();
  if (!txids || !txids.length) {
    return result;
  }

  const getOneTx = async (txid) => {
    const tx = await this.getOneTransaction(txid);
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
  const {
    blkMetas: [block],
  } = await antenna.iotx.getBlockMetas({
    byIndex: { start: blockNumber, count: 1 },
  });

  if (!block) {
    console.warn(
      `::_getOneBlock blockNumber: ${blockNumber} has invalid block`
    );
    return null;
  }

  if (+block.numActions === 0 || +block.transferAmount === 0) {
    console.warn(
      `::_getOneBlock blockNumber: ${blockNumber} has invalid data, actions: ${block.numActions}, transfer amount: ${block.transferAmount}`
    );
    return null;
  }

  const { actionInfo: actions } = await antenna.iotx.getActions({
    byBlk: { blkHash: block.hash, start: 0, count: block.numActions },
  });

  const transferActions = actions.filter(
    (a) => a.action.core["action"] === ActionType.Transfer
  );
  if (transferActions.length === 0) {
    console.warn(
      `::_getOneBlock blockNumber: ${blockNumber} has invalid transactions`
    );
    return null;
  }

  const txids = transferActions.map((a) => a.actHash);

  const blockHeader = {
    number: block.height,
    hash: block.hash,
    timestamp: block.timestamp.seconds,
  };

  return { blockHeader, txids };
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
  const result = new Transactions();
  await Promise.all(
    blockNumbers.map(async (blockNumber) => {
      const txs = await getBlockTransactions(blockNumber);
      if (txs) {
        const transactions = _.compact(txs);
        result.push(...transactions);
      }
    })
  );
  fs.writeFileSync(
    `${fromBlockNumber}-${toBlockNumber}.json`,
    JSON.stringify(result)
  );
  return result;
};

const FROM_BLOCK_NUMBER = 23238682;
const TO_BLOCK_NUMBER = 23238682;
getMultiBlocksTransactions(FROM_BLOCK_NUMBER, TO_BLOCK_NUMBER);
