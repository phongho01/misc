const { Avalanche } = require("avalanche");

// {"protocol":"https","host":"blue-red-pine.avalanche-testnet.quiknode.pro/57749a0b6e4488a347f27238a2ac8a932e10b4e9","port":"","user":"","pass":""}

const createAccountAsync = () => {
  const avalancheConnect = new Avalanche(
    "blue-red-pine.avalanche-testnet.quiknode.pro/57749a0b6e4488a347f27238a2ac8a932e10b4e9",
    "",
    "https",
    '5'
  );

  const xchain = avalancheConnect.XChain();
  const myKeyChain = xchain.keyChain();
  myKeyChain.makeKey();
  const addressesString = myKeyChain.getAddressStrings();
  const addresses = myKeyChain.getAddresses();

  const keypair = myKeyChain.getKey(addresses[0]);
  const privkstr = keypair.getPrivateKeyString();

  console.log(avalancheConnect.getHost());
  console.log(avalancheConnect.getPort());
  console.log(avalancheConnect.getProtocol());
  console.log(avalancheConnect.getNetworkID());

  console.log({
    address: addressesString[0],
    privateKey: privkstr,
  })
};

createAccountAsync();
