const CryptoJS = require("crypto-js");

class Block {

    constructor(index, hash, previousHash, timestamp, data) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }

}

const genesisBlock = new Block(
    0,
    "A3949EDFB078E4ED8AC0A2A329DB8998AB989775B503893A3FA2240C05C4531D",
    null,
    1520938557877,
    "genesis"
)

let blockchain = [genesisBlock];

console.log(blockchain);

const getLastBlock = () => blockchain[blockchain.length - 1];

const getTimestamp = () => new Date().getTime() / 1000;

const getBlockchain = () => blockchain;

const createHash = (index, previousHash, timestamp, data) => {
    CryptoJs.SHA256(index + previousHash + timestamp + data).toString();
}

const createNewBlock = data => {

    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    const newHash = createHash(
        newBlockIndex, 
        previousBlock.hash, 
        newTimestamp, 
        data
    );

    const newBlock = new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimestamp,
        data
    );

    addBlockToChain(newBlock);
    return newBlock;
};

const isNewBlockValid = (candidateBlock, latestBlock) => {
    if(!isNewStructureValid(candidateBlock)) {
        console.log('the candidate block structure is not valid');
        return false;
    }
    else if (latestBlock.index + 1 !== candidateBlock.index) {
        console.log('the candidate block doesnt have a valid index');
        return false;
    } else if (latestBlock.hash !== candidateBlock.previousHash) {
        console.log('the previousHash of the candidate block is not the hash of the latest block');
        return false;
    } else if (getBlockHash(candidateBlock) !== candidateBloocck.hash) {
        console.log('the hash of this block is invalid');
        return false;
    }
    return true;
};

const isNewStructureValid = (block) => {
    return (
        typeof block.index === "number" && 
        typeof block.hash === "string" && 
        typeof block.previousHash === "string" && 
        typeof block.timestamp === "number" && 
        typeof block.data === "string"
    );
};

const isChainValid = (candidateChain) => {
    const isGenesisValid = block => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };

    if(!isGenesisValid(candidateChain[0])) {
        console.log("the candidateChains's genesisBlock is not the same as our genesisBlock");
        return false;
    }

    for(let i = 1; i < candidateChain.length; i++) {
        if(!isNewBlockValid(candidateChain[i], candidateChain[i - 1])) {
            return false;
        }
    }
    return true;
};

const replaceChain = newChain => {
    if(isChainValid(newChain) && newChain.length > blockchain.length) {
        blockchain = newChain;
        return true;
    } else {
        return false;
    }
};

const addBlockToChain = newBlock => {
    if(isNewBlockValid(candidateBlock, getLastBlock())) {
        getBlockchain().push(candidateBlock);
        return true;
    } else {
        return false;
    }
};

module.exports = {
    getBlockchain,
    createNewBlock
};
