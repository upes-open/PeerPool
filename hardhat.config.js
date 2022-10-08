require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */


const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    polygon_mumbai: {
        url: POLYGON_MUMBAI_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 80001,
        blockConfirmations: 3,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
    // namedAccounts: {
    //     deployer: {
    //         default: 0, // here this will by default take the first account as deployer
    //         1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    //     },
    // },
};
