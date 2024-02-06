const xrpl = require("xrpl");

const wallet = xrpl.Wallet;

const createAccountAsync = () => {
  const data = wallet.generate();
  console.log({ address: data.classicAddress, privateKey: data.seed });
};

createAccountAsync();
