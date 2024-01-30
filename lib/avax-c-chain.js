
const Web3 = require("web3");
const web3 = new Web3();

const FULL_RPC_URL = `https://api.avax-test.network/ext/bc/C/rpc`;

const provider = new Web3.providers.HttpProvider(FULL_RPC_URL);
web3.setProvider(provider);

const run = async () => {
  try {
    const block = await web3.eth.getBlock(28678162);
    console.log(block)
  } catch (error) {
    console.error(error);
  }
};

run()
