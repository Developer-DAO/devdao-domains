// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDevDAONFT.sol";
import "./interfaces/IDevDAORegistry.sol";

contract DevDAOResolver is Ownable, Initializable {
    IDevDAONFT public token;
    IDevDAORegistry public registry;

    function initialize(IDevDAONFT _token, IDevDAORegistry _registry)
        external
        initializer
    {
        token = _token;
        registry = _registry;
        _transferOwnership(msg.sender);
    }

    function reverseRecordETH(string calldata name)
        external
        view
        returns (bool, address)
    {
        bytes32 _address = registry
            .addressRecords(registry.namesToTokenId(name))
            .ethereum;

        if (_address != 0) {
            return (true, address(uint160(uint256(_address)))); // it is possible to set reverse records to the zero address
        } else {
            return (false, address(0));
        }
    }
}
