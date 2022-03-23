// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DevDAOPriceOracle is Ownable {
    mapping(uint8 => uint256) public lengthToPrices;

    constructor() {
        lengthToPrices[3] = 1 ether;
        lengthToPrices[4] = 0.5 ether;
        lengthToPrices[5] = 0.1 ether;
    }

    function setMapping(uint8 length, uint256 price) external onlyOwner {
        lengthToPrices[length] = price;
    }
}
