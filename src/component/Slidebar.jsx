import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { LuPanelLeft } from 'react-icons/lu'
import { BsThreeDots } from 'react-icons/bs'
import Button from './Button';
import { fetchChat } from '../utils/fetchChat';
import UseChat from '../hooks/UseChat';

export default function Slidebar({ isActive, setIsActive }) {
  const { setActiveChatId } = UseChat();
  const [chatList, setChatList] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetchChat();
      const response = res?.data;

      // remove duplication data 
      const unique = [];
      const map = new Map;
      response.forEach(Element => {
        if (!Element.message) return;
        if (!map.has(Element.chat_id)) {
          map.set(Element.chat_id, Element.message);
          unique.push({ chat_id: Element.chat_id, title: Element.message });
        }
      });

      setChatList(unique);
    })();
  }, []);

  function newChat() {
    const chat_id = crypto.randomUUID();
    setActiveChatId(chat_id);
    setMessage([]);
  }

  console.log(currentChatId)
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
              btnLink={newChat}
              btnName={"New chat"}
            />
          </div>
        </div>

        {/* History */}
        <div className="flex-grow overflow-auto">
          <h1 className='text-center text-xm text-gray-100/60'>Conversation</h1>
          <div className='flex flex-col gap-1 px-3 mt-2'>
            {chatList.map((itm) => (
              <button
                onClick={() => setCurrentChatId(itm.chat_id)}
                key={itm.title}
                className="
                w-full px-2 py-1.5 text-start text-gray-50 rounded-md
                hover:bg-gray-100/10 transition-colors duration-150
                cursor-pointer truncate max-w-1.5:"
              >
                {itm.title}
              </button>
            ))}
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
