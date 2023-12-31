// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract LilPudgys is ERC1155 {
    constructor() ERC1155("https://api.pudgypenguins.io/lil/{id}") {
        _mint(_msgSender(), 1, 5, "");
    }

    function mint(address _to, uint256 _id, uint256 _amount) external {
        _mint(_to, _id, _amount, "");
    }

    function burn(address _from, uint256 _id, uint256 _amount) external {
        _burn(_from, _id, _amount);
    }
}
