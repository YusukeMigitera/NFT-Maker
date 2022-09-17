const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("Web3Mint");
  const Contract = await ContractFactory.deploy();

  console.log("Contract deployed to: ", Contract.address);

  let txn = await Contract.makeAnEpicNFT();
  await txn.wait();
  console.log("Minted NFT #1");
  txn = await Contract.makeAnEpicNFT();
  await txn.wait();
  console.log("Minted NFT #2");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();