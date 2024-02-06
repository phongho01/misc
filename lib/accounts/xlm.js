const StellarSdk = require('stellar-sdk');

const createAccountAsync = async () => {
  const pair = StellarSdk.Keypair.random();
  const privateKey = pair.secret();
  const address = pair.publicKey();

  console.log({
    address,
    privateKey,
  });
};

createAccountAsync();
