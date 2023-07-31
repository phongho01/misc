// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20Token } from "./IERC20Token.sol";

import { IUserBalance } from "./UserBabance.sol";

contract LiteCoin is ERC20 {
    IUserBalance userBalance;

    constructor(string memory _name, string memory _symbol, address _userBalance) ERC20(_name, _symbol) {
        userBalance = IUserBalance(_userBalance);
    }

    uint256 public constant PRICE = 1e15;
    uint256 public constant REWARDS = 1e18;

    event SetWhitelist(address indexed operator, address[] addresses);
    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);
    event Airdroped(address indexed from, address[] to, uint256 amount);
    event Swapped(address indexed erc20Address, uint256 amount);
    event Bought(address indexed buyer, uint256 amount);
    event Sold(address indexed buyer, uint256 amount);
    event LockedToken(address indexed from, uint256 amount);
    event UnlockedToken(address indexed from, uint256 amount);
    event ClaimdRewards(address indexed to, uint256 amount);
    event Staked(address indexed from, uint256 amount);
    event UnStaked(address indexed from, uint256 amount);

    mapping(address => uint256) public lockedTokens;

    mapping(address => uint256) public stakedTokens;

    function mint(address _to, uint256 _amount) external {
        userBalance.add(_to, _amount);

        _mint(_to, _amount);
        emit Minted(_to, _amount);
    }

    function airdrop(address[] memory _to, uint256 _amount) external {
        for (uint256 i = 0; i < _to.length; i++) {
            userBalance.transfer(_msgSender(), _to[i], _amount);
            transfer(_to[i], _amount);
        }

        emit Airdroped(_msgSender(), _to, _amount);
    }

    // function burn(uint256 _amount) external {
    //     _burn(_msgSender(), _amount);

    //     emit Burned(_msgSender(), _amount);
    // }

    // function airdrop(address _to, uint256 _amount) external {
    //     transfer(_to, _amount);

    //     emit Airdroped(_msgSender(), _to, _amount);
    // }

    // function swap(address _erc20Address, address _to, uint256 _amount) external payable {
    //     transfer(_erc20Address, _amount);
    //     IERC20Token(_erc20Address).mint(_msgSender(), _amount);

    //     (bool success, ) = _to.call{ value: msg.value }("");
    //     require(success, "Fail transfer native");

    //     emit Swapped(_erc20Address, _amount);
    // }

    // function buy() external payable {
    //     uint256 _amount = msg.value / PRICE;
    //     _mint(_msgSender(), _amount);

    //     emit Bought(_msgSender(), _amount);
    // }

    // function sell(uint256 _amount) external {
    //     _burn(_msgSender(), _amount);

    //     (bool success, ) = (_msgSender()).call{ value: (PRICE * _amount) / 1e18 }("");
    //     require(success, "Fail transfer!");

    //     emit Sold(_msgSender(), _amount);
    // }

    // function lockToken(uint256 _amount) external {
    //     lockedTokens[_msgSender()] += _amount;
    //     transfer(address(this), _amount);

    //     emit LockedToken(_msgSender(), _amount);
    // }

    // function unlockToken(uint256 _amount) external {
    //     require(lockedTokens[_msgSender()] >= _amount, "Not enough locked tokens");
    //     lockedTokens[_msgSender()] -= _amount;
    //     ERC20(address(this)).transfer(_msgSender(), _amount);

    //     emit UnlockedToken(_msgSender(), _amount);
    // }

    // function claimRewards() external {
    //     _mint(_msgSender(), REWARDS);
    //     emit ClaimdRewards(_msgSender(), REWARDS);
    // }

    // function stake(uint256 _amount) external {
    //     stakedTokens[_msgSender()] += _amount;
    //     transfer(address(this), _amount);

    //     emit Staked(_msgSender(), _amount);
    // }

    // function unStake() external {
    //     require(stakedTokens[_msgSender()] > 0, "Not enough locked tokens");
    //     uint256 _amount = stakedTokens[_msgSender()];
    //     stakedTokens[_msgSender()] -= 0;
    //     ERC20(address(this)).transfer(_msgSender(), _amount);
    //     _mint(_msgSender(), REWARDS);

    //     emit UnStaked(_msgSender(), _amount);
    // }
}
