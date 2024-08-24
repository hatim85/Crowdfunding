const hre = require('hardhat')
require('dotenv').config();
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory("Crowdfunding");
  const contract = await ContractFactory.deploy();
  console.log("Factory: ", ContractFactory);
  console.log("contract: ", contract);
  await contract.waitForDeployment();
  // await contract.deployed();
  // await contract.deployTransaction.wait();

  console.log("Contract deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
