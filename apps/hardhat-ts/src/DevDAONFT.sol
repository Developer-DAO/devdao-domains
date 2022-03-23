// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DevDAONFT is ERC721, Ownable, Initializable {
    uint256 public tokenId;
    mapping(uint256 => string) public names;

    constructor() ERC721("DEVDAO Domains", ".devdao") {}

    function initialize() external initializer {
        _transferOwnership(msg.sender);
    }

    function mint(address _to, string calldata name)
        external
        onlyOwner
        returns (bool)
    {
        names[tokenId] = name;
        _mint(_to, ++tokenId);
        return true;
    }
}
