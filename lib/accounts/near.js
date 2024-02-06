const { KeyPairEd25519 } = require("near-api-js/lib/utils");
const nearAPI = require('near-api-js');
const BN = require('bn.js');

const masterAccountID = 'x-wallet.testnet';

function getConfig(network) {
  return {
    networkId: network,
    nodeUrl: `https://rpc.${network}.near.org`,
    walletUrl: `https://wallet.${network}.near.org`,
    helperUrl: `https://helper.${network}.near.org`,
    explorerUrl: `https://explorer.${network}.near.org`,
  }
}

const createAccountAsync = async () => {
  const nearConfig = getConfig('testnet');
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();

  const api = await nearAPI.connect({
    ...nearConfig,
    keyStore: keyStore,
    headers: {}
  });


  const keyPair = KeyPairEd25519.fromRandom();
  const pubKey = keyPair.getPublicKey();
  const subId = new Date().valueOf().toString();
  const masterAccount = await api.account(masterAccountID);
  let newAccount;
  try {
    newAccount = await masterAccount.createAccount(
      `${subId}.${masterAccountID}`,
      pubKey,
      new BN("1820000000000000000000")
    );
    return Promise.resolve({
      address: newAccount.transaction.receiver_id,
      privateKey: keyPair.secretKey,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

createAccountAsync();
