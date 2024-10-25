const TronWeb = require("tronweb");
require("dotenv").config();

// {"protocol":"https","bookhost":"https://api.trongrid.io","port":"","apikey":"4375505b-d4ff-46ed-bbec-c3012efdbded"}
// {"protocol":"https","bookhost":"https://tron-rpc.publicnode.com","port":"","apikey":"4375505b-d4ff-46ed-bbec-c3012efdbded"}

const tronWeb = new TronWeb({
  fullHost: `https://trx.nownodes.io/tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv`,
});

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://trx.nownodes.io/tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv");
const solidityNode = new HttpProvider("https://trx.nownodes.io/tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv");
const eventServer = new HttpProvider("https://trx.nownodes.io/tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv");
const tronWeb20 = new TronWeb(fullNode, solidityNode, eventServer);
tronWeb20.setAddress("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");

const createAccountAsync = async () => {
  const address = await tronWeb.createAccount();
  console.log({
    address: address.address.base58,
    privateKey: address.privateKey,
  });
};

const getAddressBalance = async (address) => {
  try {
    console.log(" balance 1 ");
    const instance = await tronWeb20
      .contract()
      .at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
    console.log("balance 2");
    let res = await instance.balanceOf(address).call();
    console.log("balance 3");
    return res?.toString();
  } catch (error) {
    console.log('error', error);
  }
};

const run = async () => {
  const data = await getAddressBalance("TLarccXXAM6WYtENc1vK66A1F2z5pRHEci");
  console.log(data);
};

run();

// createAccountAsync();
