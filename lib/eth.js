const Web3 = require("web3");
const web3 = new Web3();
web3.setProvider(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  )
);

const getRawTransaction = async (txid) => {
  const tx = await web3.eth.getTransaction(txid);
  console.log(tx);
};

getRawTransaction("0x03bd4e26953403d3551ceb0bf25f916df798fcccf8e407609c2764e04fc86c82")