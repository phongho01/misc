// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EvelynStarlight is ERC20, Ownable {
    constructor(string memory _name, string memory _symbol, uint256 _initSupply) ERC20(_name, _symbol) {
        _mint(_msgSender(), _initSupply);
    }

    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);
    event Airdroped(address indexed from, address[] to, uint256 amount);

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
        emit Minted(_to, _amount);
    }

    function airdrop(address[] memory _to, uint256 _amount) external {
        for (uint256 i = 0; i < _to.length; i++) {
            transfer(_to[i], _amount);
        }

        emit Airdroped(_msgSender(), _to, _amount);
    }
}
