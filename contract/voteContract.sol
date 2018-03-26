pragma solidity ^0.4.2;

import "./rng.sol";

contract voteContract{
    struct voter{
        address voterAddr;
        //uint tokensBought;
        //uint tokensUsedPerCandidate;
    }

    mapping (address => voter) public voterInfo;
    mapping (bytes32 => uint) public votesReceived;

    bytes32[] public candidateList;

    //event logData(uint256 dataToLog);
    event
    modifier isValidVoter(){
        if (msg.sender != this.voterAddr)
            throw;
        _;
    }

    function voteContract(address voterAddr, ){
        data = initData;
        this.voterAddr = voterAddr;
        this.category = category;
    }

    function getData(){
        return data;
    }

    function setData(uint256 newData) {
        //logData(newData);
        data = newData;
    }
}
