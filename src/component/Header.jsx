import React, { useEffect, useRef, useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import logo from '../assets/logo.png'
import { UseTheme } from '../hooks/UseTheme'

export default function Header() {
    const { theme, handleTheme } = UseTheme();
    const [scroll, setScroll] = useState(false);

    function handleScroll() {
        if (window.scrollY > 20) {
            setScroll(true);
        } else {
            setScroll(false);
        };
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <header
            className={`z-40 transition-all duration-300 ease-in-out backdrop-blur-sm 
                ${theme
                    ? (scroll
                        ? "bg-black/80 shadow-md"
                        : "bg-transparent")
                    : (scroll
                        ? "bg-white/80 shadow-md"
                        : "bg-transparent")
                }`}>
            <nav className='max-w-7xl mx-auto pr-4 py-1'>
                <div className='flex justify-between items-center'>
                    {/* logo */}
                    <a
                        className={`flex items-center text-2xl transition-colors duration-300 ease-in-out ${theme ? "text-gray-300": "text-shadow-gray-600"}`}
                        href="#">
                        <div>
                            <img
                                className='size-20 object-cover'
                                src={logo}
                                alt="logo-png" />
                        </div>
                        Chat2PDF
                    </a>
                    {/* btns */}
                    <div className='flex items-center space-x-6'>
                        <button
                            onClick={handleTheme}
                            className='relative w-5 h-5 cursor-pointer'>
                            <BsSun size={20} className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${theme ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                            <BsMoon size={20} className={`absolute inset-0 text-blue-400 transition-all duration-300 ${theme ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                        </button>
                        <div className='relative w-5 h-5'>
                            <button className={`cursor-pointer transition-colors duration-300 ease-in-out ${theme ? "text-white" : ""}`}><CgProfile size={20} /></button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
