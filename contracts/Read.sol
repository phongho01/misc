// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Read {
    function one() external pure returns (uint256) {
        return 1;
    }

    function two() external pure returns (uint256) {
        return 2;
    }

    function hello() external pure returns (string memory) {
        return "Hello, world!";
    }
}
