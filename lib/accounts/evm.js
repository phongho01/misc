const Web3 = require("web3");

const chains = ["avax", "eth", "matic", "bsc", "eth-w", "ftm"];

const web3 = new Web3();

const createAccountAsync = () => {
  const data = web3.eth.accounts.create();
  const { address, privateKey } = data
  console.log({ address, privateKey });
};

createAccountAsync();
