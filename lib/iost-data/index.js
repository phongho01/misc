const axios = require("axios");

const run = async (from, to) => {
  for (let i = from; i <= to; i++) {
    const { data } = await axios.get(
      `http://54.180.196.80:30001/getBlockByNumber/${i}/true`
    );

    const oneBlock = data.block;
    const block = {
      number: oneBlock?.number,
      hash: oneBlock?.hash,
      timestamp: Math.floor(Number(oneBlock?.time) / 1000000000), // convert nano second to seconds
    };

    const allTxsFiltered = oneBlock?.transactions.filter(
      (tran) =>
        tran.amount_limit.length > 0 &&
        tran.amount_limit[0].value != "unlimited"
    );

    const txids = allTxsFiltered.map((tx) => {
      const data = {
        ...tx,
        block_number: block?.number,
        blockTimestamp: Number(oneBlock?.timestamp),
      };
      return data;
    });

    console.log(txids);

    // if (allTxsFiltered.length > 0 && data.block.transactions.length > 3) {
    //   console.log(i);
    //   console.log(allTxsFiltered);
    // }
  }
};

const FROM_BLOCK = 296815664;
const TO_BLOCK = FROM_BLOCK;

run(FROM_BLOCK, TO_BLOCK)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
