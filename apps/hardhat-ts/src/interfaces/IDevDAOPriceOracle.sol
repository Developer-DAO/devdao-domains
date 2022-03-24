// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

interface IDevDAOPriceOracle {
    function initialize() external;

    function lengthToPrices(uint8) external view returns (uint256);
}
