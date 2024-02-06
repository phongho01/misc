const Key = require('@chainapsis/cosmosjs/utils/key.js');
const crypto = require('crypto');

const createAccountAsync = () => {
  const { privKey, mnemonic } = Key.generateWallet((array) => {
    return crypto.randomBytes(array.length);
  });

  console.log({
    address: privKey.toPubKey().toAddress().toBech32("cosmos"),
    privateKey: privKey.toString(),
  })
};

createAccountAsync();
