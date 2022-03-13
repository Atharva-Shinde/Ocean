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

    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [formData, setFormData] = useState({addressTo:"", amount:"", keyword:"",message:""})

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]:e.target.value}));
    }

    const checkIfWalletIsConnected = async() => {
        //👇 if no ethereum object i.e no metamask ethereum account is found 
        if(!ethereum) return alert("please install metamask extension to connect your wallet to the application ");
        //👇 this gives an array list of users metamask account if present and if not logs a null array and displays the above error
        const accounts = await ethereum.request({method: 'eth_accounts'});
        setCurrentAccount(accounts[0]);
        console.log(accounts); 
    }

    const connectWallet = async() => {
        try {
            // this makes a request to metamask to connect to your metamask wallet account 
            // and thus opens the metamaskk extension
            const accounts = await ethereum.request({method:'eth_requestAccounts'})
            // if account/s are found, the first account is considered and user is prompted to connect it with MetaMask 
            setCurrentAccount(accounts[0]);
            // console.log(accounts);

        } 
        catch (error) {
            throw alert("Connect your metamask wallet to send Ethereum from your account")
        }
    }

    const sendTransaction = async () =>{
        try {
            if(ethereum) {

            const transactionContract =getEthereumContract();
            const {addressTo, amount, keyword,message} = formData;
            // to convert the amount passed for eg: 0.0001 Eth to hexadecimal or GWEI number to get recognised by blockchain
            const parsedAmount = ethers.utils.parseEther(amount);

            console.log(formData);

            await ethereum.request({
                method:'eth_sendTransaction', 
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas:'0x5208',
                    value: parsedAmount._hex,
                }],
            });
            // addToBlockchain is the function from solidity contract -> Transactions.sol which stores the transactions to blockchain
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);
            console.log(transactionHash);
            window.location.reload();

        }
        } catch (error) {
            console.log(error);
            throw new Error("Unexpected error occured");
        }
    };

    // to call the checkIfWalletIsConnected function at the initial render of the applicaiton
    useEffect(() =>{
        checkIfWalletIsConnected();
    },[])
    // 👆the empty array here means that the functions should only be run for the first render of the application 

    return(
        //TransactionContext.Provider here is declared to help in defining what ("context") we need to define
        // we provide what we need to give access to inside "value={{}}"
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
};