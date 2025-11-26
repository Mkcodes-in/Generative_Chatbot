import React from 'react'
import logo from '../assets/logo.png'
import { LuPanelLeft } from 'react-icons/lu'
import { BsThreeDots } from 'react-icons/bs'
import Button from './Button';
export default function Slidebar({ isActive, setIsActive }) {
  return (
    <aside className={`fixed top-0 left-0 h-screen w-64 bg-zinc-800 transition-transform duration-300 text-white 
      ${isActive ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex flex-col gap-3 h-screen">
        
        {/* Header */}
        <div className="flex-col gap-4 p-4 overflow-hidden">
          <div className='flex items-center justify-between'>
            <img className="size-8 object-cover" src={logo} alt="png" />
            <span className='text-lg font-semibold'>Chat2PDF</span>
            <button onClick={() => setIsActive(!isActive)} className="cursor-pointer">
              <LuPanelLeft
                size={19}
                color="white"
                strokeWidth={1.2}
                className="transition-all duration-200 hover:opacity-100 opacity-70"
              />
            </button>
          </div>
          <div className='flex items-center justify-center mt-6'>
            <Button 
            btnName={"New chat"}
            />
          </div>
        </div>

        {/* History */}
        <div className="flex-grow overflow-auto">
          <h1 className='text-center text-xm text-gray-100/60'>Conversation</h1>
          <div>

          </div>
        </div>

        {/* Footer / Profile */}
        <div className="mt-auto w-full px-2 py-2">
          <button className="flex w-full items-center justify-between cursor-pointer hover:bg-gray-100/10 px-3 py-2 rounded-full">
            Munna Kumar <BsThreeDots />
          </button>
        </div>
      </div>
    </aside>
  );
}
