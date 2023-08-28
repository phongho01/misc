// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Bank {
    event Deposited(address indexed account, uint256 indexed amount);
    event Withdrawn(address indexed account, uint256 amount);
    event Transferred(address indexed from, address indexed to, uint256 indexed amount);
    event Received(address, uint);

    address public owner;

    /**
     * @notice Address to balance of account
     */
    mapping(address => uint256) public balanceOf;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    /**
     * @notice Deposit to bank
     * @dev Everyone can call
     *
     * emit { Deposited } event
     */
    function deposit() external payable {
        require(msg.value > 0, "Invalid value!");
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
        require(_amount <= balanceOf[msg.sender], "Balance is not enough!");
        balanceOf[msg.sender] -= _amount;

        (bool success, ) = (msg.sender).call{ value: _amount }("");
        require(success, "Fail transfer native");

        emit Withdrawn(msg.sender, _amount);
    }

    /**
     * @notice Transfer balance in bank to other account
     * @dev everyone can call
     * @param _to Receiver
     */
    function transfer(address _to) external payable {
        // require(_amount <= balanceOf[msg.sender], "Balance is not enough!");
        require(msg.sender != _to, "Can not transfer to yourself");
        // balanceOf[msg.sender] -= _amount;
        // balanceOf[_to] += _amount;
        (bool success, ) = (_to).call{ value: msg.value }("");
        require(success, "Fail transfer native");

        emit Transferred(msg.sender, _to, msg.value);
    }

    function forceWithdraw() external {
        require(msg.sender == owner, "Caller is not owner");
        uint256 _amount = address(this).balance;
        (bool success, ) = (msg.sender).call{ value: _amount }("");
        require(success, "Fail transfer native");

        emit Withdrawn(msg.sender, _amount);
    }
}
