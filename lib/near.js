const { KeyPairEd25519 } = require("near-api-js/lib/utils");
const nearAPI = require('near-api-js');
const BN = require('bn.js');

const provider = new nearAPI.providers.JsonRpcProvider({ url: "https://archival-rpc.mainnet.near.org/" });