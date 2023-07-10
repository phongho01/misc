// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Formula {
    uint256 public value;

    address public owner;

    constructor() {
        value = 0;
        owner = msg.sender;
    }

    function increase() external {
        value += 1;
    }

    function decrease() external {
        value -= 1;
    }

    function add(uint256 _amount) external {
        value += _amount;
    }

    function sub(uint256 _amount) external {
        value -= _amount;
    }

    function print(string memory message) external pure returns (string memory) {
        return message;
    }

    function myAddress() external view returns (address) {
        return address(this);
    }

    function getTrue() external pure returns (bool) {
        return true;
    }

    function getFalse() external pure returns (bool) {
        return true;
    }
}