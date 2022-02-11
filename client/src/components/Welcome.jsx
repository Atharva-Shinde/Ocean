import { AiFillPlayCircle } from "react-icons/ai";
import {SiEthereum} from "react-icons/ai";
import {BsInfoCircle} from "react-icons/ai";
import {Loader} from './';

const Input = ({type, placeholder, name}) => (
    <input 
        type={type}
        placeholder={placeholder}
        name={name}
        // this👇 makes the amount start from 0.0001 rather than 1,2 etc.. 
        step="0.0001"
        className="my-2 bg-transparent outline-none text-sm text-white border-none"
    />
);

const gridStyle = "flex justify-center items-center border-[0.5px] p-3";

const Welcome = () =>{

    const connectWallet = () =>{

    }

    const handleSubmit =() =>{
        
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                    Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                    </p>
                    <button onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] " type="button">
                        <p className="text-white text-base font-semibold">Invest Now</p>
                    </button>

                    <div className="grid  sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`text-white rounded-tl-2xl ${gridStyle}`}>Secure</div>
                        <div className={`text-white ${gridStyle}`}>Reliable</div>
                        <div className={`text-white rounded-tr-2xl ${gridStyle}`}>Monitored</div>
                        <div className={`text-white rounded-bl-2xl ${gridStyle}`}>Configured</div>
                        <div className={`text-white ${gridStyle}`}>Decentralised</div>
                        <div className={`text-white rounded-br-2xl ${gridStyle}`}>easy to use</div>       
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 my-5 eth-card white-glassmorphism">
                    WhatQQ
                </div>
                {/* form 👇 */}
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism ">
                    <Input type="email" placeholder="AddressTo" name="address" />
                    <Input type="number" placeholder="Amount" name="amount"/>
                    <Input type="email" placeholder="Keyword"/>
                    <Input type="text" placeholder="Enter message"/>
                    {/* <div className="h-[1px] w-full bg-gray-400 my-2"> */}
                    <button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">Send Now</button>
                </div>
            </div>
        </div>
    )
}

export default Welcome;