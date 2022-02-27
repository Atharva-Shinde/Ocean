import React, {useContext} from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import {SiEthereum} from "react-icons/ai";
import {BsInfoCircle} from "react-icons/ai";
import { TransactionContext} from '../context/TransactionContext';
import {Loader} from './';

const Input = ({type, placeholder, name, handleChange}) => (
    <input 
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, name)}
        // this👇 makes the amount start from 0.0001 rather than 1,2 etc.. 
        step="0.0001"
        className="my-2 bg-transparent outline-none text-sm text-white border-none"
    />
);

const gridStyle = "flex justify-center items-center border-[0.5px] p-3";

const Welcome = () =>{
    // to transfer the value of the context created inside TransactionContext.jsx under the name TransactionContext
    const {connectWallet, currentAccount, handleChange, formData, sendTransaction} = useContext(TransactionContext);

    const handleSubmit =(e) =>{
        const {addressTo, amount, keyword, message} = formData;
        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;
        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> to your loved ones
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                    Explore the crypto world. Buy and sell cryptocurrencies easily on Ocean.
                    </p>
                     {/* if account isn't connnected then display the button */}
                    {!currentAccount && (
                        // connectWallet is a function that checks if the user has an metamask account and if yes it connects this app to users metamask wallet                  
                        <button onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] " type="button">
                        <p className="text-white text-base font-semibold">Connect My Wallet</p>
                        </button>)
                    }
                    

                    <div className="grid  sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`text-white rounded-tl-2xl ${gridStyle}`}>Secure</div>
                        <div className={`text-white ${gridStyle}`}>Reliable</div>
                        <div className={`text-white ${gridStyle}`}>Monitored</div>
                        <div className={`text-white ${gridStyle}`}>Configured</div>
                        <div className={`text-white ${gridStyle}`}>Decentralised</div>
                        <div className={`text-white rounded-br-2xl ${gridStyle}`}>easy to use</div>       
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 my-5 eth-card white-glassmorphism">
                    Ethereum
                </div>
                {/* form 👇 */}
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism ">
                    <Input type="email" placeholder="AddressTo" name="addressTo" handleChange={handleChange}/>
                    <Input type="number" placeholder="Amount" name="amount" handleChange={handleChange}/>
                    <Input type="email" placeholder="Keyword" name="keyword" handleChange={handleChange}/>
                    <Input type="text" placeholder="Enter message" name="message" handleChange={handleChange}/>
                    {/* <div className="h-[1px] w-full bg-gray-400 my-2"> */}
                    <button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">Send Now</button>
                </div>
            </div>
        </div>
    )
}

export default Welcome;