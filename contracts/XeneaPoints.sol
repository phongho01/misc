// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XeneaPoints is ERC20, ERC20Permit, Ownable {
    constructor()
        ERC20("Xenea Points", "XPTS")
        ERC20Permit("Xenea Points")
        Ownable(msg.sender)
    {
        _mint(msg.sender, 100000000000 * 10 ** decimals());
    }
}