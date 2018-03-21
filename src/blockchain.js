const CryptoJS = require("crypto-js"),
    hexToBinary = require("hex-to-binary");

class Block {

    constructor(index, hash, previousHash, timestamp, data, difficulty, nonce) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }

}

const genesisBlock = new Block(
    0,
    "A3949EDFB078E4ED8AC0A2A329DB8998AB989775B503893A3FA2240C05C4531D",
    null,
    1520938557877,
    "genesis",
    0,
    0
);

let blockchain = [genesisBlock];

const getNewestBlock = () => blockchain[blockchain.length - 1];

const getTimestamp = () => new Date().getTime() / 1000;

const getBlockchain = () => blockchain;

const createHash = (index, previousHash, timestamp, data, difficulty, nonce) => 
    CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(data) + difficulty + nonce).toString();


const createNewBlock = data => {

    const previousBlock = getNewestBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();

    const newBlock = findBlock(
        newBlockIndex,
        previousBlock.hash,
        newTimestamp,
        data,
        15
    );

    addBlockToChain(newBlock);
    require("./p2p").broadcastNewBlock();
    return newBlock;
};

const findBlock = (index, previousHash, timestamp, data, difficulty) => {
    let nonce = 0;
    while(true) {
        console.log('current nonce: ', nonce);
        const hash = createHash(
            index,
            previousHash,
            timestamp,
            data,
            difficulty,
            nonce
        );
        //to do: check amount of zeros
        if(hashMatchesDifficulty(hash, difficulty)) {
            return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
        }
        else {
            nonce++;
        }
    }

};

const hashMatchesDifficulty = (hash, difficulty) => {
    const hashInBinary = hexToBinary(hash);
    const requiredZeros = "0".repeat(difficulty);
    console.log('Trying difficulty:', difficulty, 'with hash', hashInBinary);
    return hashInBinary.startsWith(requiredZeros);
};

const getBlocksHash = block =>
    createHash(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce);

const isBlockValid = (candidateBlock, latestBlock) => {

    if(!isBlockStructureValid(candidateBlock)) {
        console.log('the candidate block structure is not valid');
        return false;
    } else if (latestBlock.index + 1 !== candidateBlock.index) {
        console.log('the candidate block doesnt have a valid index');
        return false;
    } else if (latestBlock.hash !== candidateBlock.previousHash) {
        console.log('the previousHash of the candidate block is not the hash of the latest block');
        return false;
    } else if (getBlocksHash(candidateBlock) !== candidateBlock.hash) {
        console.log('the hash of this block is invalid');
        return false;
    }
    return true;
};

const isBlockStructureValid = block => {
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
        if(!isBlockValid(candidateChain[i], candidateChain[i - 1])) {
            return false;
        }
    }
    return true;
};

const replaceChain = candidateBlock => {
    if(isChainValid(candidateBlock) && candidateBlock.length > getBlockchain().length) {
        blockchain = candidateBlock;
        return true;
    } else {
        return false;
    }
};

const addBlockToChain = candidateBlock => {
    if(isBlockValid(candidateBlock, getNewestBlock())) {
        getBlockchain().push(candidateBlock);
        return true;
    } else {
        return false;
    }
};

module.exports = {
    getBlockchain,
    createNewBlock,
    getNewestBlock,
    isBlockStructureValid,
    addBlockToChain,
    replaceChain
};
