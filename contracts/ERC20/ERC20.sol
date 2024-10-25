// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20Token } from "./IERC20Token.sol";

contract WAVE is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    event Minted(address indexed to, uint256 amount);

    function mint(address _to, uint256 _amount) external {
        userBalance.add(_to, _amount);

        _mint(_to, _amount);
        emit Minted(_to, _amount);
    }
}
