import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import { LuPanelLeft } from 'react-icons/lu'
import { BsThreeDots } from 'react-icons/bs'
import Button from './Button';
import UseChat from '../hooks/UseChat';
import { deleteChatHistory } from '../utils/deleteChatHistory';
import { MdDeleteForever } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';
import { supabase } from '../supabase/supabase';

export default function Slidebar({ isActive, setIsActive, newChat, session }) {
  const { chatHistoryId, setActiveChatId, setChatHistoryId, chatHistory } = UseChat();
  const [isActiveLog, setIsActiveLog] = useState(false);
  const logRef = useRef(null);

  const userSession = session?.user?.email;
  useEffect(() => {
    newChat();
  }, []);

  // existing chat 
  function existingChat(chatId) {
    if (chatId) {
      setActiveChatId(chatId);
    }
  }

  useEffect(() => {
    function handleClickOutSide(e){
      if(logRef.current && !logRef.current.contains(e.target)){
        setIsActiveLog(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  async function logOut(){
    try {
      const { error } = await supabase.auth.signOut();
      if(error) throw error;
    } catch (error) {
      console.error("error: ", error);
    }
  }

  return (
    <aside className={`fixed top-0 left-0 h-screen w-64 bg-zinc-800 transition-transform duration-300 text-white shadow-lg 
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
          <div
            onClick={() => setIsActive(false)}
            className='flex items-center justify-center mt-6'>
            <Button
              btnLink={newChat}
              btnName={"New chat"}
            />
          </div>
        </div>

        {/* History */}
        <div className="flex-grow overflow-auto">
          <h1 className='text-center text-xm text-gray-100/60'>Conversation</h1>

          <div className="flex flex-col gap-1 px-3 mt-2">
            {chatHistory.map((itm) => (
              <button
                onClick={() => {
                  setChatHistoryId(itm.chat_id);
                  existingChat(itm.chat_id);
                  setIsActive(false);
                }}
                key={itm.chat_id}
                className={`${itm.chat_id === chatHistoryId ? "bg-gray-100/10" : ""} group flex items-center justify-between w-full px-2 py-1.5 text-start text-gray-50 rounded-xl hover:bg-gray-100/10 transition-colors duration-150 cursor-pointer`}
              >
                {/* Title */}
                <span className="truncate flex-1">{itm.title}</span>

                {/* Delete Icon */}
                <MdDeleteForever
                  size={18}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChatHistory(itm.chat_id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration- text-red-400 flex-shrink-0 ml-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer / Profile */}
        <div
          onClick={() => setIsActiveLog(!isActiveLog)}
          className="relative mt-auto w-full px-2 py-1 border-t-1 border-gray-50/13">
          <button className="flex w-full items-center justify-between cursor-pointer px-3 py-2 rounded-full text-sm">
            {userSession} <BsThreeDots />
          </button>
        </div>

        {/* Logout */}
        {isActiveLog && (
          <div
          ref={logRef} 
          className="absolute bottom-8 w-full px-4">
            <button
              onClick={logOut}
              className="
              flex w-full items-center justify-center gap-2 cursor-pointer
              bg-white/10 backdrop-blur-md border border-white/20
              px-4 py-2 rounded-full text-sm text-white
              hover:bg-white/20 transition-all duration-200
              "
            >
             <BiExit /><span className="text-md font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
