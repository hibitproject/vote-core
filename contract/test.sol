pragma solidity ^0.4.2;

contract Contract{
    address owner;
    uint256 data;

    event logData(uint256 dataToLog);

    modifier onlyOwner(){
        if (msg.sender != onwer)
            throw;
        _;
    }

    function Contract(uint256 initData, address initOwner){
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
