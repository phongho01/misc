const {
  address_to_hex,
  key_new,
  key_to_pub_key,
  pub_key_to_address,
} = require("@dfinity/rosetta-client");

const createAccountAsync = () => {
  const privateKey = key_new();
  const publicKey = key_to_pub_key(privateKey);
  const address = pub_key_to_address(publicKey);

  console.log({
    address: address_to_hex(address),
    privateKey: privateKey.toString("base64"),
  });
};

createAccountAsync();
