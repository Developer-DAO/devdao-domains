// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDevDAONFT.sol";
import "./interfaces/IDevDAOPriceOracle.sol";
import "./interfaces/IDevDAORegistry.sol";

error DISALLOWED_LENGTH();
error NOT_ENOUGH_ETH();
error ALREADY_MINTED();
error MINT_FAILED();

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
        token.initialize(address(_registry));
        registry.initialize(address(_token));
        oracle.initialize();
    }

    function arbitraryCall(address _contract, bytes calldata _calldata)
        external
        payable
        onlyOwner
    {
        // solhint-disable-next-line
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
        if (minLength > length) {
            revert DISALLOWED_LENGTH();
        }

        if (length > maxLength) {
            revert DISALLOWED_LENGTH();
        }

        if ( msg.value < oracle.lengthToPrices(uint8(length))) {
            revert NOT_ENOUGH_ETH();
        }

        if (registry.namesToTokenId(name) != 0){
            revert ALREADY_MINTED();
        }

        // solhint-disable-next-line
        treasury.call{value: msg.value}("");

        if (!token.mint(msg.sender, name)) {
            revert MINT_FAILED();
        }
    }
}
