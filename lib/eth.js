const Web3 = require("web3");
const web3 = new Web3();
web3.setProvider(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  )
);

const getRawTransaction = async (txid) => {
  const tx = await web3.eth.getTransactionReceipt(txid);
  console.log(tx);
  // web3.currentProvider.sendAsync(
  //   {
  //     method: "debug_traceTransaction",
  //     params: [tx, {}],
  //     jsonrpc: "2.0",
  //     id: "2",
  //   },
  //   function (err, result) {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(result);
  //   }
  // );
};

getRawTransaction(
  "0xd7e958717c8940668a67fe5f6a4237d2a14fa2fa4089a79041b21333c7f7ea8a"
);

const test = [
  {
    protocol: "https",
    host: "boldest-bold-needle.avalanche-mainnet.quiknode.pro/a60af275213ebc826b83ad9b72ab1c717c08f12a",
    port: "",
    user: "",
    pass: "",
  },
  {
    protocol: "https",
    rpchost: "bch.nownodes.io",
    bookhost: "bchbook.nownodes.io",
    port: "443",
    apikey: "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
  },
  {
    protocol: "https",
    rpchost: "btc.nownodes.io",
    bookhost: "btcbook.nownodes.io",
    port: "443",
    apikey: "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
  },
  {
    protocol: "https",
    host: "https://atom.nownodes.io",
    port: "80",
    user: "",
    pass: "",
    apiKey: "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
    gas: "95000",
  },
  {
    protocol: "https",
    rpchost: "doge.nownodes.io",
    bookhost: "dogebook.nownodes.io",
    port: "443",
    apikey: "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
  },
  {
    protocol: "http",
    host: "http://3.95.176.149:8080",
    port: "8080",
    apikey: "",
  },
  {
    protocol: "http",
    host: "https://api.iotex.one:443",
    port: "8080",
    apikey: "",
    web3Host: "https://babel-api.mainnet.iotex.io",
  },
  {
    protocol: "https",
    rpchost: "ltc.nownodes.io",
    bookhost: "ltcbook.nownodes.io",
    port: "443",
    apikey: "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
    version: "1",
  },
  {
    protocol: "https",
    host: "https://rpc.mainnet.near.org",
    port: "80",
    user: "x-wallet.near",
    pass: "ed25519:3chBNNJgRURmvqvWMSQ8Z8Z2Qjkqta2hjbWSeZUioXfRrsjVnJK34qsZWMsZTnA6LDD8vqyGxN7btaoGwmQ6xY45",
    fee: "1820000000000000000000",
  },
  {
    protocol: "wss",
    host: "wss://rpc.polkadot.io",
    rpc: "https://polkadot.api.onfinality.io/rpc?apikey=53879583-a0d3-48dc-ae25-9702dd3c1224",
    port: "",
    apikey: "",
    minAmount: "0",
  },
  {
    useNonce: true,
    protocol: "https",
    host: "https://cool-wispy-snow.solana-mainnet.quiknode.pro/c87ab1c06f637307af0cfeef5c6852843e4b698d",
    apiKey: "tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
  },
  {
    protocol: "https",
    rpchost: "https://terra-lcd.publicnode.com",
    port: "80",
    user: "",
    pass: "",
    gasAdjustment: "1.5",
    gas: 20000,
    fee: 20000,
  },
  {
    protocol: "https",
    rpchost: "https://terra-classic-lcd.publicnode.com",
    port: "80",
    user: "",
    pass: "",
    gasLimit: 263430,
    feeDefault: 12000000,
  },
  {
    protocol: "https",
    bookhost: "https://api.trongrid.io",
    port: "",
    apikey: "4375505b-d4ff-46ed-bbec-c3012efdbded",
  },
  "wss://neat-broken-dawn.xrp-mainnet.quiknode.pro/b4b5d3f76eb50e26f16486726c7099c6b5b356d9/",
  {
    protocol: "https",
    host: "https://mainnet.api.tez.ie",
    port: "80",
    user: "",
    pass: "",
  },
];
