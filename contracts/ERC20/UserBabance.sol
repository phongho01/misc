// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

interface IUserBalance {
    function transfer(address _from, address _to, uint256 _amount) external;

    function add(address _account, uint256 _amount) external;
}

contract UserBalance {
    event Added(address indexed account, uint256 amount);
    event Transferred(address indexed from, address indexed to, uint256 amount);

    mapping(address => uint256) public balances;

    function add(address _account, uint256 _amount) external {
        balances[_account] += _amount;
        emit Added(_account, _amount);
    }

    function transfer(address _from, address _to, uint256 _amount) external {
        require(balances[_from] >= _amount, "Not enough balance");
        balances[_from] -= _amount;
        balances[_to] += _amount;

        emit Transferred(_from, _to, _amount);
    }
}
