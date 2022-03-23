// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDevDAONFT.sol";
import "./interfaces/IDevDAOPriceOracle.sol";

contract DevDAONameService is Ownable {
    uint8 public minLength = 3;
    uint8 public maxLength = 20;

    IDevDAONFT public immutable token;
    IDevDAOPriceOracle public immutable oracle;
    address payable public immutable treasury;

    error NotEnoughETH();

    constructor(
        IDevDAONFT _token,
        IDevDAOPriceOracle _oracle,
        address payable _treasury
    ) {
        token = _token;
        oracle = _oracle;
        treasury = _treasury;
        token.initialize();
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
        require(length > maxLength && length < minLength, "DISALLOWED_LENGTH");
        if (length >= 5) {
            if (msg.value < oracle.lengthToPrices(5)) {
                revert NotEnoughETH();
            }
        } else {
            if (msg.value < oracle.lengthToPrices(uint8(length))) {
                revert NotEnoughETH();
            }
        }
        treasury.call{value: msg.value}("");
        require(token.mint(msg.sender, name), "MINT_FAILED");
    }
}
