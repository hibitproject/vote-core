pragma solidity ^0.4.2;

import "./rng.sol";

contract voteContract{
    address owner;
    uint256 data;

    event logData(uint256 dataToLog);

    modifier onlyOwner(){
        if (msg.sender != owner)
            throw;
        _;
    }

    function voteContract(uint256 initData, address initOwner){
        data = initData;
        address = initOwner;
    }

    function getData(){
        return data;
    }

    function setData(uint256 newData) onlyOwner {
        logData(newData);
        data = newData;
    }
}
