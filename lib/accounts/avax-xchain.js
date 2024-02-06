const { Avalanche } = require("avalanche");

const createAccountAsync = () => {
  const avalancheConnect = new Avalanche(
    "boldest-bold-needle.avalanche-mainnet.quiknode.pro/a60af275213ebc826b83ad9b72ab1c717c08f12a",
    "443",
    "https",
    1
  );

  const xchain = avalancheConnect.XChain();
  const myKeyChain = xchain.keyChain();
  myKeyChain.makeKey();
  const addressesString = myKeyChain.getAddressStrings();
  const addresses = myKeyChain.getAddresses();

  const keypair = myKeyChain.getKey(addresses[0]);
  const privkstr = keypair.getPrivateKeyString();

  console.log({
    address: addressesString[0],
    privateKey: privkstr,
  })
};

createAccountAsync();
