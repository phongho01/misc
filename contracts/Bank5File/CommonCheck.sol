// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract CommonCheck {
    modifier notZeroAddress(address _account) {
        require(_account != address(0), "Invalid address");
        _;
    }

    modifier notZeroAmount(uint256 _amount) {
        require(_amount > 0, "Invalid amount");
        _;
    }

    modifier notEmptyArrayAddress(address[] memory addressList) {
        require(addressList.length > 0, "Array address must not be empty");
        _;
    }
}
