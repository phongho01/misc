const TronWeb = require("tronweb");
require('dotenv').config();

const tronWeb = new TronWeb({
  fullHost: `https://api.trongrid.io`,
  headers: { "TRON-PRO-API-KEY": process.env.TRON_PRO_API_KEY },
});

const createAccountAsync = async () => {
  const address = await tronWeb.createAccount();
  console.log({
    address: address.address.base58,
    privateKey: address.privateKey,
  });
};

createAccountAsync();
