# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

### Install required packages
npm install

Try running some of the following tasks:

```shell
# deploy Bank contract on BCS Testnet (single file)
npm run deploy-bank-bsc
# deploy Bank contract on CVC Testnet (single file)
npm run deploy-bank-cvc

# deploy Bank contract on BCS Testnet (multiple file)
npm run deploy-bank-multiple-file-bsc
# deploy Bank contract on CVC Testnet (multiple file)
npm run deploy-bank-multiple-file-cvc

# deploy Tether on BCS Testnet
npm run deploy-tether-bsc
# deploy Tether on CVC Testnet
npm run deploy-tether-cvc

# deploy NFT on BCS Testnet
npm run deploy-nft-bsc
# deploy NFT on CVC Testnet
npm run deploy-nft-cvc

# combine multiple contract files into one contract
npx hardhat flatten contracts/contract_name.sol > contracts/flatten_contract.sol
# example
npx hardhat flatten contracts/BankMultipleFile.sol > contracts/FlattenBankMultipleFile.sol
```
