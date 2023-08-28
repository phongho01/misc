// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract TeamWE is ERC721Enumerable {
    using Strings for uint256;
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;

    /**
     * @notice Token Id
     */
    Counters.Counter public tokenIds;

    string public baseURI = "";

    /**
     * @dev List token id of owner
     */
    mapping(address => EnumerableSet.UintSet) _tokensOfOwner;

    /**
     * @notice null Constructor
     * @param _baseURI Base URI of NFT
     */
    constructor(string memory _baseURI, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }

    function mint(address _to, uint256 _amount) external {
        for (uint256 i = 0; i < _amount; i++) {
            tokenIds.increment();
            _safeMint(_to, tokenIds.current());
            _tokensOfOwner[_msgSender()].add(tokenIds.current());
        }
    }

    function burn(uint256 _tokenId) external {
        _burn(_tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token!");
        return string(abi.encodePacked(baseURI));
    }

    function tokensOfOwner(address _owner) external view returns (uint256[] memory) {
        return _tokensOfOwner[_owner].values();
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override {
        if (from != address(0) && to != address(0)) {
            _tokensOfOwner[from].remove(firstTokenId);
            _tokensOfOwner[to].add(firstTokenId);
        }

        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }
}
