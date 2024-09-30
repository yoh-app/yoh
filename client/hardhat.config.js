require('@nomiclabs/hardhat-waffle');
require("dotenv").config();

const ALCHEMY_RINKEBY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_API_KEY;
const ALCHEMY_POLYGON_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY;
const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;

module.exports = {
  solidity: '0.8.6',
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_RINKEBY_API_KEY}`,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    klaytn: {
      url: `https://public-node-api.klaytnapi.com/v1/cypress`,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/Gcb78XzoVYj-yTx1fl9x1qjYqTepvSzW`,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_POLYGON_API_KEY}`,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/IhQZvolZgCYau1bAPFNnggl2UUE7IhVC`,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/BwozjhjStgKhDpC73Ni7kcxpPKiY3rV6`,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
  },
  paths: {
    artifacts: './src/web3/artifacts',
    sources: './src/web3/contracts',
    cache: './src/web3/cache',
    tests: './src/web3/test',
  },
};
