// SPDX-License-Identifier: GPL-3.0

/**

█▄░█ █▀▀ ▀█▀   █▀▀ █▀▄ █ ▀█▀ █ █▀█ █▄░█ █▀
█░▀█ █▀░ ░█░   ██▄ █▄▀ █ ░█░ █ █▄█ █░▀█ ▄█

▀█ █▀█ █▀█ ▄▀█
█▄ █▄█ █▀▄ █▀█

 */

pragma solidity 0.8.6;

import {ClonesUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "./SingleEditionMintable.sol";

contract SingleEditionMintableCreator {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Counter for current contract id upgraded
    CountersUpgradeable.Counter private atContract;

    // Admin fee address
    address payable public immutable feeAccount; // the account that receives fees

    /// Address for implementation of SingleEditionMintable to clone
    address public implementation;

    /// Initializes factory with address of implementation logic
    /// @param _implementation SingleEditionMintable logic implementation contract to clone
    constructor(address _implementation, address _feeAccount) {
        feeAccount = payable(_feeAccount);
        implementation = _implementation;
    }

    /// Creates a new edition contract as a factory with a deterministic address
    /// Important: None of these fields (except the Url fields with the same hash) can be changed after calling
    /// @param _name Name of the edition contract
    /// @param _symbol Symbol of the edition contract
    /// @param _description Metadata: Description of the edition entry
    /// @param _imageUrl Metadata: Image url (semi-required) of the edition entry
    /// @param _editionSize Total size of the edition (number of possible editions)
    /// @param _royaltyBPS BPS amount of royalty
    function createEdition(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _imageUrl,
        string memory _contractURI,
        uint256 _editionSize,
        uint256 _royaltyBPS,
        // uint256 _storageSize,
        uint256 _salePrice
    ) external payable returns (uint256) {
        // require(msg.value == _storageSize, "Wrong price");
        uint256 newId = atContract.current();
        address newContract = ClonesUpgradeable.cloneDeterministic(
            implementation,
            bytes32(abi.encodePacked(newId))
        );
        SingleEditionMintable(newContract).initialize(
            msg.sender,
            _name,
            _symbol,
            _description,
            _imageUrl,
            _contractURI,
            _editionSize,
            _royaltyBPS,
            // _storageSize,
            _salePrice
        );
        // payable(feeAccount).transfer(_storageSize);
        emit CreatedEdition(
            address(msg.sender),
            address(newContract),
            _salePrice
        );
        // Returns the ID of the recently created minting contract
        // Also increments for the next contract creation call
        atContract.increment();
        return newId;
    }

    /// Get edition given the created ID
    /// @param editionId id of edition to get contract for
    /// @return SingleEditionMintable Edition NFT contract
    function getEditionAtId(uint256 editionId)
        external
        view
        returns (SingleEditionMintable)
    {
        return
            SingleEditionMintable(
                ClonesUpgradeable.predictDeterministicAddress(
                    implementation,
                    bytes32(abi.encodePacked(editionId)),
                    address(this)
                )
            );
    }

    /// Emitted when a edition is created reserving the corresponding token IDs.
    event CreatedEdition(
        address indexed creator,
        address editionContractAddress,
        uint256 salePrice
    );
}
