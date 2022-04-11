// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDevDAONFT.sol";
import "./interfaces/IDevDAOPriceOracle.sol";
import "./interfaces/IDevDAORegistry.sol";

contract DevDAONameService is Ownable {
    uint8 public minLength = 3;
    uint8 public maxLength = 20;

    IDevDAONFT public immutable token;
    IDevDAOPriceOracle public immutable oracle;
    IDevDAORegistry public immutable registry;
    address payable public immutable treasury;

    constructor(
        IDevDAONFT _token,
        IDevDAORegistry _registry,
        IDevDAOPriceOracle _oracle,
        address payable _treasury
    ) {
        token = _token;
        registry = _registry;
        oracle = _oracle;
        treasury = _treasury;
        token.initialize();
        registry.initialize();
        oracle.initialize();
    }

    function arbitraryCall(address _contract, bytes calldata _calldata)
        external
        payable
        onlyOwner
    {
        _contract.call{value: msg.value}(_calldata);
    }

    function updateMinLength(uint8 _newMinLength) external onlyOwner {
        minLength = _newMinLength;
    }

    function updateMaxLength(uint8 _newMaxLength) external onlyOwner {
        maxLength = _newMaxLength;
    }

    function mint(string calldata name) external payable {
        uint256 length = bytes(name).length; // we don't care about non-UTF8 lengths
        require(minLength <= length && length <= maxLength, "DISALLOWED_LENGTH");
        require(msg.value >= oracle.lengthToPrices(uint8(length)), "NOT_ENOUGH_ETH");
        treasury.call{value: msg.value}("");
        require(token.mint(msg.sender, name), "MINT_FAILED");
    }
}
