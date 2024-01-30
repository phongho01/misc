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
  const WS_RPC = "wss://westend-rpc.polkadot.io";
  const wsProvider = new WsProvider(WS_RPC);
  const api = await ApiPromise.create({ provider: wsProvider });

  const unsigned = methods.balances.transfer(
    {
      dest: "FoQJpPyadYccjavVdTWxpxU7rUEaYhfLCPwXgkfD6Zat9QP",
      value: 584742635878,
    },
    {
      // Additional information needed to construct the transaction offline.
    }
  );

  const signingPayload = construct.signingPayload(unsigned, { registry });
  // On your offline device, sign the payload.
  const signature = myOfflineSigning(signingPayload);

  // `tx` is ready to be broadcasted.
  const tx = construct.signedTx(unsigned, signature, { metadataRpc, registry });
  console.log(tx)
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log("ERROR:", error);
    process.exit(1);
  });
