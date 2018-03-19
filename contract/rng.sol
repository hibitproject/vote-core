pragma solidity ^0.4.2;

contract RNG {
    mapping (address => uint) nonces;
    uint public randomNumber;

	function RNG() { }

	function randomNumber() returns(uint) {
        return randomNumberFromSeed(uint(sha3(block.number))^uint(sha3(now))^uint(msg.sender)^uint(tx.origin));
    }

    function randomNumberFromSeed(uint seed) returns(uint) {
        nonces[msg.sender]++;
        randomNumber = seed^(uint(sha3(block.blockhash(block.number),nonces[msg.sender]))*0x000b0007000500030001);
        return randomNumber;
    }

	function guess(uint _guess) returns (bool) {
        if (randomNumber() == _guess) {
            //if (!msg.sender.send(this.balance)) throw;
            return true;
        }
        return false;
    }
}
