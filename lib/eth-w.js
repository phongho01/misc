const Web3 = require("web3");
const web3 = new Web3();
const axios = require("axios");

const RPC = "https://ethw.nownodes.io";
const API_KEY = "14e6cb9b-7a79-4b6f-961c-a56218e07472";

// const FULL_RPC_URL = `${RPC}/${API_KEY}`;
const FULL_RPC_URL = `https://mainnet.ethereumpow.org`;

const provider = new Web3.providers.HttpProvider(FULL_RPC_URL);
web3.setProvider(provider);

const getReceipt = async (txid) => {
  const receipt = await web3.eth.getTransactionReceipt(txid);
  console.log(receipt);
};

const getBlockCount = async () => {
  try {
    setInterval(async () => {
      // const { data } = await axios.post(FULL_RPC_URL, {
      //   jsonrpc: "2.0",
      //   method: "eth_blockNumber",
      //   params: [],
      //   id: 83,
      // });
      const blockNum = (await web3.eth.getBlockNumber()) - 1;
      console.log("latest block", blockNum);
    }, 10000);
  } catch (error) {
    getBlockCount();
  }
};

// getReceipt(
//   "0x8a7ebd1b5627340d9dd5f14c1a2ac0dc20826e4e10a92568e2590880a0adbb18"
// );

getBlockCount();
