const { cryptoUtils } = require('sotez');

const createAccountAsync = async () => {
    const mnemonic = cryptoUtils.generateMnemonic();
    const pass = process.env.XTZ_PASSWORD ? process.env.XTZ_PASSWORD : 'my_seed_password';
    const keys = await cryptoUtils.generateKeys(mnemonic, pass);

    console.log({
        address: keys.pkh,
        privateKey: keys.sk,
      });
};

createAccountAsync()
