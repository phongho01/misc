const bitcore = require("bitcore-lib");

const createAccountAsync = () => {
  const network = bitcore.Networks.mainnet;
  const privateKey = new bitcore.PrivateKey(null, network);
  const wif = privateKey.toWIF();
  const address = privateKey.toAddress();

  console.log({
    address: address.toString(),
    privateKey: wif,
  });
};

createAccountAsync();
