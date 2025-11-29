import React, { useRef, useState, useEffect, useContext } from 'react';
import { BsArrowUp, BsPaperclip } from 'react-icons/bs';
import { sendMsg } from '../api/api';
import UseAiLoader from '../hooks/UseAiLoader';
import { FaFilePdf } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { supabase } from '../supabase/supabase';
import UseChat from '../hooks/UseChat';

export default function InputField() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const { setAiLoader } = UseAiLoader();
    const {activeChatId, setActiveChatId} = UseChat();
    const [file, setFile] = useState(null);
    // inputField auto re-size
    const handleInputChange = (e) => {
        setMessage(e.target.value);
        const textArea = textareaRef.current;
        textArea.style.height = "auto";
        textArea.style.height = Math.min(textArea.scrollHeight, 150) + "px";
    };
    
    const handleSubmit = async () => {
        if (!message.trim()) return;
        let chatId = activeChatId;
        if(!chatId){
            chatId = crypto.randomUUID();
            setActiveChatId(chatId);
        }
        const userMsg = {role: "user", message: message, "chat_id": chatId};

        try {
            await supabase.from("messages").insert(userMsg);
        } catch (error) {
            console.error("Error ", error);
        }
        
        sendMsg(chatId, setAiLoader);
        
        setMessage('');
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    
    // file upload logic
    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }
    
    function formateSize(file) {
        if (file < 1024) return file + " Bytes";
        else if (file < 1024 * 1024) return (file / 1024).toFixed(2) + " MB";
        else return (file / (1024 * 1024)).toFixed(2) + " MB";
    }

    return (
        <div className='w-full p-4 pt-2 bg-transparent'>
            <div
                ref={textareaRef}
                className='relative bg-[#303030] text-white pb-14 shadow-lg rounded-3xl w-full max-w-3xl mx-auto z-40'
            >
                <textarea
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder='Ask me anything...'
                    className='w-full py-4 px-6 min-h-0 text-lg resize-none border-none outline-none pr-16 pl-5 transition-all duration-200 bg-transparent'
                    rows={1}
                />

                {/* File Upload */}
                <label
                    htmlFor="file"
                    className='absolute bottom-4 left-3 p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white cursor-pointer transition-colors duration-200'
                    title="Upload file"
                >
                    <BsPaperclip className="text-lg" />
                </label>
                <input
                    onChange={handleFileChange}
                    className='hidden'
                    type="file"
                    id="file" />

                {/* Send Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                    className={`absolute bottom-4 right-3 p-2 rounded-full transition-all duration-200 ${message.trim()
                        ? 'bg-gray-50 text-black hover:bg-white cursor-pointer'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <BsArrowUp className="text-lg font-bold" />
                </button>
                {/* File upload */}
                <div>

                </div>
            </div>
        </div>
    );
}
