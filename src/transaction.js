const CryptoJS = require("crypto-js");

class TxOut {
    constructor(address, amount) {
        this.address = address;
        this.amount = amount;
    }
}

class TxIn {
    //uTxOutId
    //uTxOutIndex
    //signature

}

class Transaction {
    //ID
    //txIns[]
    //txOuts[]
}

class UTxOut {
    constructor(uTxOutId, uTxOutIndex, address, amount) {
        this.uTxOutId = uTxOutId;
        this.uTxOutIndex = uTxOutIndex;
        this.address = address;
        this.amount = amount;
    }
}

let uTxOuts = [];

const getTxId = tx => {
    const txInsContent = tx.txIns
        .map(txIn => txIn.TxOutId + txIn.txOutIndex)
        .reduce((a, b) => a + b, "");

    const txOutContent = tx.txOuts
        .map(txOut => txOut.address + txOut.amount)
        .reduce((a, b) => a + b, "");

    return CryptoJS.SHA256(txInsContent + txOutContent).toString();
};