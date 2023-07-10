import * as dotenv from 'dotenv';
dotenv.config();
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: { count: 20 },
      chainId: 31337
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    sepolia: {
      url: `https://rpc2.sepolia.org/`,
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    mainnet: {
      url: 'https://bsc-dataseed1.ninicoin.io',
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    mumbai: {
			url: "https://polygon-mumbai.blockpi.network/v1/rpc/public	",
			accounts: [process.env.DEPLOY_ACCOUNT!],
			chainId: 80001,
		},
    cvcTestnet: {
      url: 'https://rpc-kura.cross.technology',
      accounts: [process.env.DEPLOY_ACCOUNT!],
    }
  },
  etherscan: {
    apiKey: {
      sepolia: `${process.env.ETHERSCAN_API_KEY}`,
      bscTestnet: `${process.env.BINANCE_API_KEY}`,
      mumbai: `${process.env.MUMBAI_API_KEY}`
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
      {
        version: '0.7.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};

export default config;