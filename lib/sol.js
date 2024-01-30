const { Connection, PublicKey, SystemProgram } = require("@solana/web3.js");
const BigNumber = require("bignumber.js");
const fs = require("fs");

const connection = new Connection(
  "https://cool-wispy-snow.solana-mainnet.quiknode.pro/c87ab1c06f637307af0cfeef5c6852843e4b698d",
  {
    httpHeaders: {
      "api-key": "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
    },
  }
);

const getAddressBalance = async (address) => {
  const addressSol = new PublicKey(address);
  const balance = await connection.getBalance(addressSol);
  console.log(balance);
};

const generateSolTransaction = (transaction) => {
  const { preBalances, postBalances, fee } = transaction.meta;
  const accountKeys =
    transaction.transaction.message["accountKeys"] ||
    transaction.transaction.message["staticAccountKeys"];

  if (accountKeys?.length < 2) {
    return null;
  }

  console.log("accountKeys", accountKeys);
  console.log("preBalances", preBalances);
  console.log("postBalances", postBalances);
  
  const from = accountKeys[0].toBase58();
  let toIndex = 1;
  for (let i = 0; i < preBalances.length; i++) {
    if (preBalances[i] < postBalances[i]) {
      const to =
        accountKeys[i]?.toBase58() ||
        transaction.meta.loadedAddresses.writable[0].toBase58();
      const amount = new BigNumber(postBalances[i]).minus(
        preBalances[i]
      );
    }
  }

  const to =
    accountKeys[toIndex]?.toBase58() ||
    transaction.meta.loadedAddresses.writable[0].toBase58();
  const amount = new BigNumber(postBalances[toIndex]).minus(
    preBalances[toIndex]
  );

  return {
    txid: transaction.transaction.signatures[0],
    from,
    to,
    fee: new BigNumber(fee),
    amount,
  };
};

const getOneBlock = async (blockNumber) => {
  const block = await connection.getBlock(blockNumber, {
    commitment: "finalized",
    maxSupportedTransactionVersion: 1,
  });

  const transaction = block.transactions.find((item) =>
    item.transaction.signatures.includes(
      "F1wuxTut1u5LRgTTkXykaPS7V9hXWBwKWL5BXBwG8FVtZp8d1o6c5ZN3ygyGrHeiK84sJ8DhNvN1ejcFiScqjW3"
    )
  );

  const result = [];

  const accountKeys =
    transaction.transaction.message["accountKeys"] ||
    transaction.transaction.message["staticAccountKeys"];
  const instructions =
    transaction.transaction.message["instructions"] ||
    transaction.transaction.message["compiledInstructions"];
  const instructionCount = instructions?.length;

  if (instructionCount) {
    const instruction = instructions.filter((i) => {
      const programId = accountKeys[i.programIdIndex];

      return programId.toBase58() === SystemProgram.programId.toBase58();
    });
    result.push(generateSolTransaction(transaction));
  }

  console.log(result);

  // generateSolTransaction(transaction);

  // fs.writeFileSync(`lib/saved-data/sol.json`, JSON.stringify(transaction));
};

getOneBlock(244395393);
