import React from 'react' ;
import { useState } from 'react';
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
// import {logo} from '../../public/logo192.png';

const NavBarItem =({title,classProps}) => (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
);

const Navbar = () =>{
    // this👇 state is used to see if mobile menu is toggled
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div>
            <nav className="w-full flex md:justify-center justify-between items-center p-4">

                <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial '>
                    {["Market", "Exchange", "Tutorials", "Wallets"].map((item)=>(
                        <NavBarItem title={item}/>
                    ))}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>Login</li>
                </ul>

                {/* 👇 toggle menu for mobile view */}
                <div className='flex relative'>
                    {toggleMenu?<AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer"onClick={() => setToggleMenu(false)}/>:<HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer"onClick={() => setToggleMenu(true)}/>}
                    {toggleMenu &&(
                        <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen flex flex-col justify-start items-end blue-glassmorphism text-white'>
                            {["Market","Exchange", "Tutorials", "Wallets"].map((item, index)=>(
                                // the key helps React to identify which items have changed, are added, or are removed
                                <NavBarItem key={item+index} title={item} classProps="my-2 text-lg"/>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;