const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("NFT-Maker", function () {
  async function deployNftMakerFixture() {
    const phrase = "This is my NFT contract.";

    const [owner] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("Web3Mint");
    const Contract = await ContractFactory.deploy();

    return { Contract, owner, phrase };
  }

  describe("Deployment", function () {
    it("Should set the right phrase", async function () {
      const { Contract, phrase } = await loadFixture(
        deployNftMakerFixture
      );

      const contractPhrase = await Contract.phrase();
      expect(contractPhrase).to.equal(phrase);
      console.log("Contract deployed to:", Contract.address);
    });
  });

  describe("Mint", function () {
    it("Should mint", async function () {
      const { Contract } = await loadFixture(
        deployNftMakerFixture
      );

      let txn = await Contract.makeAnEpicNFT();
      await txn.wait();
      txn = await Contract.makeAnEpicNFT();
      await txn.wait();
    });
  });
});
