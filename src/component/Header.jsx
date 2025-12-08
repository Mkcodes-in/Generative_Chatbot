import { BsMoon, BsSun } from 'react-icons/bs'
import logo from '../assets/logo.png'
import { UseTheme } from '../hooks/UseTheme'
import { LuCircleFadingPlus, LuPanelLeft } from 'react-icons/lu';
import { useState } from 'react';
import Slidebar from './Slidebar';
import UseChat from '../hooks/UseChat';

export default function Header({session}) {
    const { theme, handleTheme } = UseTheme();
    const [isActiveSlide, setIsActiveSlide] = useState(false);
    const {setState, setActiveChatId} = UseChat();
    
    // new chat
    function newChat() {
        const chat_id = crypto.randomUUID();
        setActiveChatId(chat_id);
        setState([]);
    }

    return (
        <header
            className={`z-40 transition-all duration-300 ease-in-out backdrop-blur-sm 
                ${theme ? "bg-transparent" : "bg-transparent"}`}>
            <nav className='max-w-full mx-auto pr-4 py-1'>
                <div className='flex justify-between items-center'>
                    {/* logo */}
                    <div
                        className={`flex items-center text-2xl transition-colors duration-300 ease-in-out gap-5 p-2 ${theme ? "text-gray-300" : "text-shadow-gray-600"}`}>
                        <div>
                            <img
                                className='size-8 object-cover'
                                src={logo}
                                alt="logo-png" />
                        </div>
                        {/* slideBar menu */}
                        <div className='flex justify-center gap-4 border rounded-full border-gray-400/20 p-2 bg-gray-200/12'>
                            <button
                                onClick={() => setIsActiveSlide(!isActiveSlide)}
                                className='cursor-pointer'>
                                <LuPanelLeft
                                    size={19}
                                    color="white"
                                    strokeWidth={2}
                                    className="transition-all duration-200 hover:opacity-100 opacity-70"
                                />
                            </button>
                            <button className='cursor-pointer'>
                                <LuCircleFadingPlus
                                    size={19}
                                    color='white'
                                    className="transition-all duration-200 hover:opacity-100 opacity-70"
                                    onClick={() => newChat()}
                                />
                            </button>
                        </div>
                    </div>
                    {/* btns */}
                    <div className='flex items-center space-x-6'>
                        <button
                            onClick={handleTheme}
                            className='relative w-5 h-5 cursor-pointer'>
                            <BsSun size={20} className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${theme ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                            <BsMoon size={20} className={`absolute inset-0 text-blue-400 transition-all duration-300 ${theme ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                        </button>
                    </div>
                </div>
            </nav>
            {/* slideBar */}
            <Slidebar
                newChat={newChat}
                isActive={isActiveSlide}
                setIsActive={setIsActiveSlide}
                session={session}
            />
        </header>
    )
}