// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DevDAOPriceOracle is Ownable, Initializable {
    mapping(uint8 => uint256) public lengthToPrices;

    constructor() {
        lengthToPrices[3] = 1 ether;
        lengthToPrices[4] = 0.5 ether;
        lengthToPrices[5] = 0.1 ether;
        lengthToPrices[6] = 0.1 ether;
        lengthToPrices[7] = 0.1 ether;
        lengthToPrices[8] = 0.1 ether;
        lengthToPrices[9] = 0.1 ether;
        lengthToPrices[10] = 0.1 ether;
        lengthToPrices[11] = 0.1 ether;
        lengthToPrices[12] = 0.1 ether;
        lengthToPrices[13] = 0.1 ether;
        lengthToPrices[14] = 0.1 ether;
        lengthToPrices[15] = 0.1 ether;
        lengthToPrices[16] = 0.1 ether;
        lengthToPrices[17] = 0.1 ether;
        lengthToPrices[18] = 0.1 ether;
        lengthToPrices[19] = 0.1 ether;
        lengthToPrices[20] = 0.1 ether;
    }

    function initialize() external initializer {
        _transferOwnership(msg.sender);
    }

    function setMapping(uint8 length, uint256 price) external onlyOwner {
        lengthToPrices[length] = price;
    }
}
