// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

interface IDevDAORegistry {
    struct DevDAOAddressMetadata {
        bytes32 ethereum;
        bytes32 dogecoin;
        bytes32 bitcoin;
        bytes32 litecoin;
    }

    function initialize(address token) external;

    function setName(uint256 tokenId, string calldata name) external;

    function namesToTokenId(string calldata name)
        external
        view
        returns (uint256);

    function addressRecords(uint256 tokenId)
        external
        view
        returns (DevDAOAddressMetadata calldata);
}
