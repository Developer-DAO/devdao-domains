// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

interface IDevDAONFT {
    function initialize(address registry) external;

    function mint(address _to, string calldata _name) external returns (bool);
}
