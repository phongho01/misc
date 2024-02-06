const Antenna = require("iotex-antenna").default;

const antenna = new Antenna("https://api.mainnet.iotex.one:443");

const createAccountAsync = () => {
    const wallet = antenna.iotx.accounts.create();

    console.log({
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
};

createAccountAsync();
