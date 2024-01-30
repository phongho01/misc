const xrpl = require("xrpl");

const wallet = xrpl.Wallet.fromSeed("sEdVEBtMAbUahxLfKtevHghraeauPYK");
console.log("WALLET ADDRESS:", wallet.address); // rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH

async function main() {
  // Define the network client
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const txInfo = {
    TransactionType: "Payment",
    Account: wallet.address,
    Amount: "500000000",
    Destination: "r3Z6LAh4N7BiMSYxr6g9ATnFS7YbmuPdWS",
  };

  console.log(
    "==================== PREPARATION TRANSACTION ===================="
  );

  const prepared = await client.autofill(txInfo);
  const max_ledger = prepared.LastLedgerSequence;
  console.log("Prepared transaction instructions:", prepared);
  console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
  console.log("Transaction expires after ledger:", max_ledger);

  console.log("==================== SIGN TRANSACTION ====================");

  prepared.LastLedgerSequence += 1;
  const signed = wallet.sign(prepared);
  console.log("Identifying hash:", signed.hash);
  console.log("Signed blob:", signed.tx_blob);

  console.log("==================== SUBMIT TRANSACTION ====================");

  const tx = await client.submitAndWait(signed.tx_blob);
  console.log("tx:", tx);

  console.log("==================== SUBMIT RESULT ====================");

  console.log("Transaction result:", tx.result.meta.TransactionResult);
  console.log(
    "Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  );
  // Disconnect when done (If you omit this, Node.js won't end the process)
  //   await client.disconnect();
}

main();

const testObj = {
  fromPubkey: "tz1gPeubYMra3GinULtRWkVgyyhGeYQdoWcq",
  toPubkey: "tz1fuaPoqRWRZGNyrB2LJfpdcSu2J3WmFjFy",
  amount: "2500000",
  counter: 22057864,
  isConsolidate: true,
};
