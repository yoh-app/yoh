const hre = require('hardhat')
const networkName = hre.network.name

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());
  const feeAccount = process.env.ADMIN_ADDRESS
  // Get the ContractFactories and Signers here.
  // const IEditionSingleMintable = await ethers.getContractFactory('IEditionSingleMintable');
  // const IPublicSharedMetadata = await ethers.getContractFactory('IPublicSharedMetadata');
  const Payments = await ethers.getContractFactory('Payments');
  const SharedNFTLogic = await ethers.getContractFactory('SharedNFTLogic');
  const SingleEditionMintable = await ethers.getContractFactory('SingleEditionMintable');
  const SingleEditionMintableCreator = await ethers.getContractFactory('SingleEditionMintableCreator');

  // deploy contracts
  // const iEditionSingleMintable = await IEditionSingleMintable.deploy();
  // const iPublicSharedMetadata = await IPublicSharedMetadata.deploy();
  // const sharedNFTLogic = await SharedNFTLogic.deploy();

  // const sharedNFTLogicAddress = sharedNFTLogic.address;

  // const singleEditionMintable = await SingleEditionMintable.deploy(sharedNFTLogicAddress, feeAccount);

  // const singleEditionMintableAddress = singleEditionMintable.address;

  // const singleEditionMintableCreator = await SingleEditionMintableCreator.deploy(singleEditionMintableAddress, feeAccount);
  const payments = await Payments.deploy(100, feeAccount, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831");


  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(payments, 'Payments');
  // saveFrontendFiles(iPublicSharedMetadata, 'IPublicSharedMetadata');
  // saveFrontendFiles(iEditionSingleMintable, 'IEditionSingleMintable');
  // saveFrontendFiles(sharedNFTLogic, 'SharedNFTLogic');
  // saveFrontendFiles(singleEditionMintable, 'SingleEditionMintable');
  // saveFrontendFiles(singleEditionMintableCreator, 'SingleEditionMintableCreator');

}

function saveFrontendFiles(contract, name) {
  const fs = require('fs');
  const directories = ['/../contractsData', '/../../../../admin/src/contractsData']

  directories.forEach((directory) => {
    const contractsDir = __dirname + directory;

    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(contractsDir + `/${networkName}-${name}-address.json`, JSON.stringify({ address: contract.address }, undefined, 2));

    const contractArtifact = artifacts.readArtifactSync(name);

    fs.writeFileSync(contractsDir + `/${networkName}-${name}.json`, JSON.stringify(contractArtifact, null, 2));
  })


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
