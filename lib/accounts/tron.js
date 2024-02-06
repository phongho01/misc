const TronWeb = require("tronweb");

const tronWeb = new TronWeb({
  fullHost: `https://api.trongrid.io`,
  headers: { "TRON-PRO-API-KEY": "4375505b-d4ff-46ed-bbec-c3012efdbded" },
});

const createAccountAsync = async () => {
  const address = await tronWeb.createAccount();
  console.log({
    address: address.address.base58,
    privateKey: address.privateKey,
  });
};

createAccountAsync();
