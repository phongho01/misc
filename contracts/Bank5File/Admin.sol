// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Admin {
    event SetAdmin(address account, bool isAdmin);

    mapping(address => bool) public admins;

    function setAdmin(address _account, bool _isAdmin) external {
        admins[_account] = _isAdmin;

        emit SetAdmin(_account, _isAdmin);
    }
}
