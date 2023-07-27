// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

interface IBank {
    /**
     * @notice Deposit to bank
     * @dev Everyone can call
     *
     * emit { Deposited } event
     */
    function deposit() external payable;

    /**
     * @notice Withdraw from bank
     * @dev Everyone can call
     * @param _amount amount of token want to withdraw
     *
     * emit { Withdrawn } event
     */
    function withdraw(uint256 _amount) external;
}
