// Web3Mint.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/Base64.sol";
import "hardhat/console.sol";

contract Web3Mint is ERC721 {
    string public phrase;

    struct NftAttributes {
        string name;
        string imageURL;
    }
    NftAttributes[] Web3Nfts;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // NFT トークンの名前とそのシンボルを渡します。
    constructor() ERC721("NFT", "nft") {
        phrase = "This is my NFT contract.";
        console.log(phrase);
    }

    // ユーザーが NFT を取得するために実行する関数。imageURIにはIPFSのCIDを入れる
    function mintIpfsNFT(string memory name, string memory imageURI) public {
        uint256 newItemId = _tokenIds.current();
        // EOAアドレスとトークンIDを紐付ける
        _safeMint(msg.sender, newItemId);
        Web3Nfts.push(NftAttributes({name: name, imageURL: imageURI}));
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
        _tokenIds.increment();
    }

    // トークンIDを入れるとbase64エンコードしたmetadataを返す
    // OpenSeaなどが利用する
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        Web3Nfts[_tokenId].name,
                        " -- NFT #: ",
                        Strings.toString(_tokenId),
                        '", "description": "An epic NFT", "image": "ipfs://',
                        Web3Nfts[_tokenId].imageURL,
                        '"}'
                    )
                )
            )
        );
        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return output;
    }
}
