// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MintNFT is ERC721, ERC721Enumerable, ERC721URIStorage {

    using SafeMath for uint256;
    uint public constant mintPrice = 0;
    uint256 total_value;

    constructor() ERC721("flightnft.net", "FlightNFT"){}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable){
        super._beforeTokenTransfer(from,to,tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage){
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns(string memory){
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }


    function mint(string memory _uri, address recipient) public payable {
        uint256 mintIndex = totalSupply() + 1000001;
        _safeMint(recipient, mintIndex);
        _setTokenURI(mintIndex, _uri);
    }

    function returnID() public view returns(uint256){
        return totalSupply();
    }

    function charge(address payable receiverAddr) payable public{
        receiverAddr.transfer(msg.value);
    }

}