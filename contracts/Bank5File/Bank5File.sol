// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import { IBank } from "./IBank.sol";
import { TransferHelper } from "./TransferHelper.sol";
import { Admin } from "./Admin.sol";
import { CommonCheck } from "./CommonCheck.sol";

contract Bank5File is Admin, CommonCheck, IBank {
    event Deposited(address indexed account, uint256 amount);
    event Withdrawn(address indexed account, uint256 amount);
    event Transferred(address indexed from, address indexed to, uint256 amount);

    string public something = "Something you want to show!";

    /**
     * @notice Address to balance of account
     */
    mapping(address => uint256) public balanceOf;

    constructor() {}

    /**
     * @notice Deposit to bank
     * @dev Everyone can call
     *
     * emit { Deposited } event
     */
    function deposit() external payable {
        require(msg.value > 0, "Invalid value.");
        balanceOf[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    /**
     * @notice Withdraw from bank
     * @dev Everyone can call
     * @param _amount amount of token want to withdraw
     *
     * emit { Withdrawn } event
     */
    function withdraw(uint256 _amount) external {
        require(_amount <= balanceOf[msg.sender], "Balance is not enough");
        balanceOf[msg.sender] -= _amount;

        TransferHelper._transferNativeToken(msg.sender, _amount);

        emit Withdrawn(msg.sender, _amount);
    }

    /**
     * @notice Transfer balance in bank to other account
     * @dev everyone can call
     * @param _to Receiver
     */
    function transfer(address _to) external payable {
        require(msg.sender != _to, "Can not transfer to yourself");
        TransferHelper._transferNativeToken(_to, msg.value);

        emit Transferred(msg.sender, _to, msg.value);
    }
}
