import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import { contractABI, contractAddress } from '../utilities/constants';

// to create React context, more info above the TransactionProvider function
// This variable is created so that our application has access to the data we pass into TransactionContext.Provider
export const TransactionContext = React.createContext();

// this gives us access to the object which has information about our ethereum and blockchain information
//this is accessible because of the installed metamask wallet
const {ethereum} = window;

// this function detects our metamask ethereum provider and gets information of our deployed smartcontract on blockchain
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // this👇 object contains the abstraction of code deployed on blockchain 
    const transactionContract = new ethers.Contract(contractAddress, contractABI,signer);

    console.log({
        provider,
        signer,
        transactionContract,
    });
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("")

    const checkIfWalletIsConnected = async() => {
        //👇 if no ethereum object i.e no metamask ethereum account is found 
        if(!ethereum) return alert("please install metamask extension to connect your wallet to the application ");
        //👇 this gives an array list of users metamask account if present and if not logs a null array and displays the above error
        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log(accounts); 
    }

    const connectWallet = async() => {
        try {
            // this makes a request to metamask to connect to your metamask wallet account 
            // and thus opens the metamaskk extension
            const accounts = await ethereum.request({method:'eth_requestAccounts'})
            // if account/s are found, the first account is considered and user is prompted to connect it with MetaMask 
            setCurrentAccount(accounts[0]);
            console.log(accounts);

        } catch (error) {
            throw alert("Connect your metamask wallet to send Ethereum from your account")
        }
    }

    const sendTransaction = () =>{
        try {
            if(!ethereum) return alert("please install metamask extension to connect your wallet to the application ")
            
        } catch (error) {
            throw new Error("Unexpected error occured");
        }
    }

    // to call the checkIfWalletIsConnected function at the initial render of the applicaiton
    useEffect(() =>{
        checkIfWalletIsConnected();
        getEthereumContract();
    },[])
    // 👆the empty array here means that funcitons should only be run ln the first render of the application 

    return(
        //TransactionContext.Provider here is declared to help in defining what ("context") we need to define
        // we provide what we need to give access to inside "value={{}}"
        <TransactionContext.Provider value={{connectWallet, currentAccount}}>
            {children}
        </TransactionContext.Provider>
    );
};