require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const url=process.env.URL;
const privateKey=process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia: {
      url: url,
      accounts: [privateKey]
    }
  }
};
