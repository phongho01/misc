const sha256 = require('sha256');

const getTxId = (txid) => {
  return sha256(Buffer.from(txid, "base64"));
};


const rawTxId = `123132`
console.log(getTxId(rawTxId))
