// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Payments {
    using SafeERC20 for IERC20;
    IERC20 public immutable usdc;

    address payable public owner;
    uint256 public immutable platformBps;
    address public immutable platformAddress;

    constructor(
        uint256 _platformBps,
        address _platformAddress,
        address _usdcAddress
    ) {
        usdc = IERC20(_usdcAddress);
        platformBps = _platformBps;
        platformAddress = _platformAddress;
        owner = payable(msg.sender);
    }

    function pay(
        uint256 amount,
        address toAddress,
        address affiliateAddress,
        uint256 affiliateBps
    ) public payable {
        uint256 totalAmount = amount * 10 ** 6; // Assuming USDC has 6 decimals
        require(
            usdc.balanceOf(msg.sender) >= totalAmount,
            "Insufficient balance"
        );

        uint256 affiliateAmount = (totalAmount * affiliateBps) / 10000;
        uint256 platformAmount = (totalAmount * platformBps) / 10000;
        uint256 recipientAmount = totalAmount -
            affiliateAmount -
            platformAmount;

        usdc.transferFrom(msg.sender, address(this), totalAmount);

        usdc.transfer(affiliateAddress, affiliateAmount);
        usdc.transfer(platformAddress, platformAmount);
        usdc.transfer(toAddress, recipientAmount);
    }

    function payProduct(
        uint256 amount,
        address toAddress,
        address affiliateAddress,
        uint256 affiliateBps,
        string orderId
    ) public payable {
        uint256 totalAmount = amount * 10 ** 6; // Assuming USDC has 6 decimals
        require(
            usdc.balanceOf(msg.sender) >= totalAmount,
            "Insufficient balance"
        );

        uint256 affiliateAmount = (totalAmount * affiliateBps) / 10000;
        uint256 platformAmount = (totalAmount * platformBps) / 10000;
        uint256 recipientAmount = totalAmount -
            affiliateAmount -
            platformAmount;

        usdc.transferFrom(msg.sender, address(this), totalAmount);

        usdc.transfer(affiliateAddress, affiliateAmount);
        usdc.transfer(platformAddress, platformAmount);
        usdc.transfer(toAddress, recipientAmount);
    }

    function payRequest(
        uint256 amount,
        address toAddress,
        address affiliateAddress,
        uint256 affiliateBps,
        string requestId
    ) public payable {
        uint256 totalAmount = amount * 10 ** 6; // Assuming USDC has 6 decimals
        require(
            usdc.balanceOf(msg.sender) >= totalAmount,
            "Insufficient balance"
        );

        uint256 affiliateAmount = (totalAmount * affiliateBps) / 10000;
        uint256 platformAmount = (totalAmount * platformBps) / 10000;
        uint256 recipientAmount = totalAmount -
            affiliateAmount -
            platformAmount;

        usdc.transferFrom(msg.sender, address(this), totalAmount);

        usdc.transfer(affiliateAddress, affiliateAmount);
        usdc.transfer(platformAddress, platformAmount);
        usdc.transfer(toAddress, recipientAmount);
    }
}
