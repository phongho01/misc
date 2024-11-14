const { Avalanche, utils } = require("avalanche");

const restEndpoint =
  "https://avax.nownodes.io/tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv/ext/bc/X";

const rpcEndpoint = {
  protocol: "https",
  host: "avax.nownodes.io/tqf3SYtdIs4BRCjagdz7RG8JD1RcmuJv",
  port: "",
  user: "",
  pass: "",
};

// const restEndpoint =
//   "https://side-snowy-patina.avalanche-mainnet.quiknode.pro/ed754e9dc68b934452c98626d02b0f894c9dcb99/ext/index/X/block";

// const rpcEndpoint = {
//   protocol: "https",
//   host: "side-snowy-patina.avalanche-mainnet.quiknode.pro/ed754e9dc68b934452c98626d02b0f894c9dcb99",
//   port: "",
//   user: "",
//   pass: "",
// };

const chainId = 1;

const run = async () => {
  const rpcConfig = rpcEndpoint;
  const networkID = Number(chainId);
  avalancheConnect = new Avalanche(
    rpcConfig.host,
    rpcConfig.port,
    rpcConfig.protocol,
    networkID
  );
  const index = avalancheConnect.Index();

  const apiEndpoint = restEndpoint;
  const { data } = await index.callMethod('avm.getHeight', {}, apiEndpoint, )
  // const latest = await index.getHeight("hex", apiEndpoint);
  console.log("LATEST", data.result.height);
};

run();
