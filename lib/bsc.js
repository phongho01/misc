const Common = require("@ethereumjs/common").default;
const Web3 = require("web3");
const { Transaction } = require("@ethereumjs/tx");
const web3 = new Web3("https://data-seed-prebsc-1-s1.bnbchain.org:8545");
const common = Common.custom({ chainId: Number(97) });

const run = async (rawTx, retryCount = 0) => {
  console.log(retryCount);
  console.log("============ ZO 1 =============");
  const ethTx = Transaction.fromSerializedTx(Buffer.from(rawTx, "hex"), {
    common,
  });
  console.log("============ ZO 2 =============");
  let txid = ethTx.hash().toString("hex");
  if (!txid.startsWith("0x")) {
    txid = "0x" + txid;
  }

  if (!rawTx.startsWith("0x")) {
    rawTx = "0x" + rawTx;
  }

  if (!retryCount || isNaN(retryCount)) {
    retryCount = 0;
  }

  try {
    const [receipt] = await Promise.all([
      web3.eth.sendSignedTransaction(rawTx),
    ]);
    console.info(
      `BscGateway::sendRawTransaction infura_txid=${receipt.transactionHash}`
    );
    return { txid: receipt.transactionHash };
  } catch (e) {
    console.log('error', e);
    // Former format of error message when sending duplicate transaction
    if (e.toString().indexOf("known transaction") > -1) {
      console.warn(e.toString());
      return { txid };
    }

    // New format of error message when sending duplicate transaction
    if (e.toString().indexOf("already known") > -1) {
      console.warn(e.toString());
      return { txid };
    }

    // The receipt status is failed, but transaction is actually submitted to network successfully
    if (e.toString().indexOf("Transaction has been reverted by the EVM") > -1) {
      console.warn(e.toString());
      return { txid };
    }

    // If `nonce too low` error is returned. Need to double check whether the transaction is confirmed
    if (e.toString().indexOf("nonce too low") > -1) {
      const tx = await this.getOneTransaction(txid);

      // If transaction is confirmed, it means the broadcast was successful before
      if (tx && tx.confirmations) {
        return { txid };
      }

      throw e;
    }

    if (retryCount + 1 > 5) {
      console.error(
        `Too many fails sending txid=${txid} tx=${JSON.stringify(
          ethTx.toJSON()
        )} err=${e.toString()}`
      );
      throw e;
    }

    return run(rawTx, retryCount + 1);
  }
};

const rawTx =
  "f86e058505d21dba00830249f094e153510d73a4bb907bd15bb9757988758943abd388013c3107490280008081e6a0242bf1511b3024166a222f8d7c1b2a0072cd3848b5ac1d9b33a2b8790680927da00897694f855b397c388b643e1980b84e276963ad7432f0a4cae80dbdf38600c8";
run(rawTx);
