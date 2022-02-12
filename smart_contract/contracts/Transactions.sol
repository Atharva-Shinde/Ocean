// this is the Solidity smart contract 

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    // the structure of object TransferStruct 
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // an array of transactions 
    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount +=1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // "view" means we cannot modify the blockchain
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        // returns an array of transactions 
        return transactions;
    }

    function getAllTransactionsCount() public view returns (uint256){
        // returns transactioncounts as uint256 as TransactionCount variable declared above
        return transactionCount;
    }
}