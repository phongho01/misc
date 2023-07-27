### Change ERC20 Name and Symbol

- Open file contracts/ERC20/ERC20.sol
- Replace `LiteCoin` with new ERC20 name
- Replace `LTC` with new ERC20 symbol
- Open file scripts/deploy-erc20.ts
- Replace `LiteCoin` with new ERC20 name

### Functions

- mint: mint ERC20 to user (without money)
- burn: burn ERC20
- airdrop: release ERC20 to other user
- swap: swap current ERC20 with other ERC20
- buy: mint ERC20 with money, 1 XCR = 1000 TOKEN
- sell: sell ERC20 and get XCR
- lockToken: transfer token to contract
- unLockToken: withdraw token from contract
- claimRewards: get 1 token
- stake: transfer token to contract
- unStake: withdraw token from contract + bonus 1 token

### Script

```shell
# deploy ERC20 on CVC Testnet
npm run deploy-erc20-cvc

# deploy ERC20 on BSC Testnet
npm run deploy-erc20-bsc

# "deploy-erc20-cvc": "npx hardhat run scripts/deploy-erc20.ts --network cvcTestnet",
# "deploy-erc20-bsc": "npx hardhat run scripts/deploy-erc20.ts --network bscTestnet",
```
