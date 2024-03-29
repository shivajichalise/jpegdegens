// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Counter{
    uint32 counter;

    event CounterInc(uint32 counter);

    function count() public {
        counter++;
        console.log('Counter is at: ', counter);
        emit CounterInc(counter);
    }

    function getCounter() public view returns (uint32) {
        return counter;
    }
}
