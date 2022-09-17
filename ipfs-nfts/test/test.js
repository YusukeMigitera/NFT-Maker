const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("NFT-Maker", function () {
  async function deployNftMakerFixture() {
    const phrase = "This is my NFT contract.";

    const [owner, other1] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("Web3Mint");
    const Contract = await ContractFactory.deploy();

    return { Contract, owner, other1, phrase };
  }

  describe("Deployment", function () {
    it("Should set the right phrase", async function () {
      const { Contract, phrase } = await loadFixture(deployNftMakerFixture);

      const contractPhrase = await Contract.phrase();
      expect(contractPhrase).to.equal(phrase);
      console.log("Contract deployed to:", Contract.address);
    });
  });

  describe("Mint", function () {
    it("Should mint", async function () {
      const { Contract, owner, other1 } = await loadFixture(
        deployNftMakerFixture
      );

      let nftName = "poker";
      let ipfsCID =
        "bafkreievxssucnete4vpthh3klylkv2ctll2sk2ib24jvgozyg62zdtm2y";

      await Contract.connect(owner).mintIpfsNFT(nftName, ipfsCID); //0
      await Contract.connect(other1).mintIpfsNFT(nftName, ipfsCID); //1

      console.log(await Contract.tokenURI(0));
      console.log(await Contract.tokenURI(1));
    });
  });
});
