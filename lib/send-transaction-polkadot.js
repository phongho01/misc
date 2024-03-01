// Import
const { ApiPromise, WsProvider } = require("@polkadot/api");
const {
  createMetadata,
  construct,
  getRegistry,
  methods,
} = require("@substrate/txwrapper-polkadot");

const run = async () => {
  // Construct
  // const WS_RPC = "wss://dot.nownodes.io/wss";
  // const wsProvider = new WsProvider(WS_RPC, false, { 'api-key': 'tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv' });
  // const api = await ApiPromise.create({ provider: wsProvider });

  // console.log('aaaaaaaaaa')
  // console.log(api.tx.balances.forceTransfer);
  // Construct
  const wsProvider = new WsProvider('wss://dot.nownodes.io/wss', 1, { 'api-key': 'tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv' });
  const api = await ApiPromise.create({ provider: wsProvider });

  // Do something
  console.log(api.tx.balances.transfer);
  
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log("ERROR:", error);
    process.exit(1);
  });
