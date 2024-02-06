const {
    LCDClient,
    MnemonicKey,
  } = require("@terra-money/terra.js");
  
  const createAccountAsync = () => {
    const chainID = "columbus-5";
  
    const terra = new LCDClient({
      URL: this.httpProvider,
      chainID,
      gasPrices: { uluna: 0.15 },
      gasAdjustment: this.gasAdjustment,
    });
  
    const mk = new MnemonicKey();
    const wallet = terra.wallet(mk);
  
    const address = wallet.key.accAddress;
    const privateKey = mk.privateKey.toString("hex");
  
    console.log({
      address,
      privateKey,
    });
  };
  
  createAccountAsync();
  