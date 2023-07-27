// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

library TransferHelper {
    using SafeERC20 for IERC20;

    /**
     *  @notice Transfer token
     */
    function _transferToken(address _paymentToken, uint256 _amount, address _from, address _to) internal {
        if (_to == address(this)) {
            if (_paymentToken == address(0)) {
                require(msg.value == _amount, "Invalid amount");
            } else {
                IERC20(_paymentToken).safeTransferFrom(msg.sender, _to, _amount);
            }
        } else {
            if (_paymentToken == address(0)) {
                _transferNativeToken(_to, _amount);
            } else {
                if (_from == address(this)) {
                    IERC20(_paymentToken).safeTransfer(_to, _amount);
                } else {
                    IERC20(_paymentToken).safeTransferFrom(msg.sender, _to, _amount);
                }
            }
        }
    }

    /**
     *  @notice Transfer native token
     */
    function _transferNativeToken(address _to, uint256 _amount) internal {
        // solhint-disable-next-line indent
        (bool success, ) = _to.call{ value: _amount }("");
        require(success, "Fail transfer native");
    }
}
