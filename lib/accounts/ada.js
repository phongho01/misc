const Cardanocli = require("cardanocli-js");
const options = {};
options["shelleyGenesisPath"] =
  "/home/phong_ho/NAPA/ExampleContracts/lib/resources/ada-shelley-genesis.json";
options["network"] = "mainnet";

const cardanocliJs = new Cardanocli(options);

const createWallet = async (account) => {
  try {
    const paymentKeys = await cardanocliJs.addressKeyGen(account);
    let optionBuild = {
      paymentVkey: paymentKeys.vkey,
    };
    if (options["network"] === "mainnet") {
      const stakeKeys = await cardanocliJs.stakeAddressKeyGen(account);
      optionBuild["stakeVkey"] = stakeKeys.vkey;
    }
    return await cardanocliJs.wallet(account);
  } catch (err) {
    console.log(err);
  }
};

const createAccountAsync = async () => {
  const account = new Date().valueOf().toString();
  const wallet = await createWallet(account);
  console.log({ address: wallet.paymentAddr, privateKey: account });
};

createAccountAsync();
