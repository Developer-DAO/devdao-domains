// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDevDAORegistry.sol";

contract DevDAONFT is
    ERC721("DEVDAO Domains", ".devdao"),
    Ownable,
    Initializable
{
    IDevDAORegistry public registry;
    uint256 public tokenId;
    mapping(uint256 => string) public names;

    function initialize(IDevDAORegistry _registry) external initializer {
        registry = _registry;
        _transferOwnership(msg.sender);
    }

    function mint(address _to, string calldata name)
        external
        onlyOwner
        returns (bool)
    {
        uint256 currentTokenId = ++tokenId;
        names[currentTokenId] = name;
        _mint(_to, currentTokenId);
        registry.setName(currentTokenId, name);
        return true;
    }
}
