// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DevDAORegistry is Ownable, Initializable {
    using EnumerableSet for EnumerableSet.UintSet;

    struct DevDAOTextMetadata {
        string email;
        string reddit;
        string twitter;
        string discord;
        string github;
        string avatar;
        string url;
        string keywords;
    }
    struct DevDAOAddressMetadata {
        bytes32 ethereum;
        bytes32 dogecoin;
        bytes32 bitcoin;
        bytes32 litecoin;
    }
    struct DevDAOContentMetadata {
        bytes content;
    }

    mapping(address => EnumerableSet.UintSet) controllerToTokenIds;
    mapping(string => uint256) namesToTokenId;
    mapping(uint256 => DevDAOTextMetadata) public textRecords;
    mapping(uint256 => DevDAOAddressMetadata) public addressRecords;
    mapping(uint256 => DevDAOContentMetadata) public contentRecords;

    modifier onlyController(uint256 tokenId) {
        require(
            controllerToTokenIds[msg.sender].contains(tokenId),
            "ONLY_CONTROLLER"
        );
        _;
    }

    function initialize() external initializer {
        _transferOwnership(msg.sender);
    }

    function setName(uint256 tokenId, string calldata name) external onlyOwner {
        namesToTokenId[name] = tokenId;
    }

    function setText(uint256 tokenId, bytes calldata _newTextRecord)
        external
        onlyController(tokenId)
    {
        textRecords[tokenId] = abi.decode(_newTextRecord, (DevDAOTextMetadata));
    }

    function setAddrs(uint256 tokenId, bytes calldata _newAddrsRecord)
        external
        onlyController(tokenId)
    {
        addressRecords[tokenId] = abi.decode(
            _newAddrsRecord,
            (DevDAOAddressMetadata)
        );
    }

    function setContent(uint256 tokenId, bytes calldata _newContentRecord)
        external
        onlyController(tokenId)
    {
        contentRecords[tokenId] = abi.decode(
            _newContentRecord,
            (DevDAOContentMetadata)
        );
    }
}
