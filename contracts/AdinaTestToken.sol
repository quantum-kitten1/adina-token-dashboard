// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title ADINA Test Token (Base Sepolia only)
/// @notice Throwaway ERC-20 for dashboard integration testing.
///         Not the official ADINA mainnet token. Do not list or treat as production.
contract AdinaTestToken is ERC20 {
    constructor(address recipient) ERC20("ADINA Test", "tADINA") {
        require(recipient != address(0), "zero recipient");
        _mint(recipient, 1_000_000_000 * 10 ** decimals());
    }
}
