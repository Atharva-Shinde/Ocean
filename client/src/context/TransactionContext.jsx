import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import { contractABI, contractAddress } from '../utilities/constants';

// to create React context, more info above the TransactionProvider function
// This variable is created so that our application has access to the data we pass into TransactionContext.Provider
export const TransactionContext = React.createContext();

// this gives us access to the object which has information about our ethereum and blockchain information
//this is accessible because of the installed metamask wallet
const {ethereum} = window;

// this function detects our metamask ethereum provider and gets information of our deployed smartcontract
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
    const [CurrentAccount, setCurrentAccount] = useState("")

    const checkIfWalletIsConnected = async() => {
        //👇 if no ethereum object i.e no metamask ethereum account is found 
        if(!ethereum) return alert("please install metamask extension to connect the application to your wallet");
        //👇 this gives an array of your metamask account if present and if not gives the above error
        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log(accounts); 
    }

    const connectWallet = async() => {
        try {
            // this makes a request to metamask to connect to ethereum wallet account 
            // and thus opens the metamaskk extension
            const accounts = await ethereum.request({method:'eth_requestAccounts'})
            // if an account/s are found, the first account is considered and user is prompted to connect it with MetaMask 
            setCurrentAccount(accounts[0]);
        } catch (error) {
            throw alert("Install metamask extension and configure your wallet")
        }

    }

    // to call the checkIfWalletIsConnected function at the initial render of the applicaiton
    useEffect(() =>{
        checkIfWalletIsConnected();
    },[])
    // 👆the empty array here means the funciton ishould only be run ln the first render of the application 

    return(
        //TransactionContext.Provider here is declared to help in defining what ("context") we need to define
        // we provide what we need to give access to inside "value={{}}"
        <TransactionContext.Provider value={{connectWallet: connectWallet}}>
            {children}
        </TransactionContext.Provider>
    )
}