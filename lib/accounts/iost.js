const IOST = require("@kunroku/iost");

function randomAccount(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "xwallet" + result;
}

const createAccountAsync = async () => {
  let newId = randomAccount(4);
  const newKp = IOST.KeyPair.Ed25519.randomKeyPair();
  const privateKey = IOST.Bs58.encode(newKp.secretKey);
  console.log({
    address: newId,
    privateKey,
  });
};

// cost money
createAccountAsync();
