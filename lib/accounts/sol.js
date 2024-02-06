const { Keypair } = require("@solana/web3.js");

const createAccountAsync = () => {
  const keyPair = Keypair.generate();
  const privateKey = JSON.stringify(Object.values(keyPair.secretKey));
  console.log({ address: keyPair.publicKey.toString(), privateKey });
};

createAccountAsync();
