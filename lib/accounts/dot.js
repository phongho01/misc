const { Keyring } = require("@polkadot/keyring");
const { waitReady, mnemonicGenerate } = require("@polkadot/util-crypto");

const createAccountAsync = async () => {
  console.log(waitReady)

  const keyring = new Keyring({
    type: "sr25519",
    ss58Format: 0,
  });
  console.log("============ 1 =============");
  const mnemonic = mnemonicGenerate();
  console.log("============ 2 =============");
  const keyringPair = keyring.addFromMnemonic(mnemonic);
  console.log("============ 3 =============");
  logger.info(`Address: ${keyringPair.address}`);

  console.log({ address: keyringPair.address, privateKey: mnemonic });
};

createAccountAsync();
