import React, { useRef, useState, useEffect, useContext } from 'react';
import { BsArrowUp, BsPaperclip } from 'react-icons/bs';
import { sendMsg } from '../api/api';
import UseAiLoader from '../hooks/UseAiLoader';
import { FaFilePdf, FaPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { supabase } from '../supabase/supabase';
import UseChat from '../hooks/UseChat';
import { GoPlus } from 'react-icons/go';

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
        if(!activeChatId) return console.error("No active chat ID found.");
       
        const userMsg = {role: "user", message: message, "chat_id": activeChatId};

        try {
            await supabase.from("messages").insert(userMsg);
        } catch (error) {
            console.error("Error ", error);
        }
        
        sendMsg(activeChatId, setAiLoader);
        
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
        <div className='w-full bg-transparent px-4'>
            <div
                ref={textareaRef}
                className='relative bottom-5 bg-[#303030] text-white shadow-lg rounded-full w-full max-w-3xl mx-auto z-30'
            >
                <textarea
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder='Ask me anything...'
                    className='w-full py-4 px-6 min-h-0 text-md resize-none border-none outline-none pr-16 pl-14 transition-all duration-200 bg-transparent'
                    rows={1}
                />

                {/* File Upload */}
                <label
                    htmlFor="file"
                    className='absolute bottom-3.5 left-3 p-1 rounded-full hover:bg-gray-50/10 text-white cursor-pointer transition-colors duration-200'
                    title="Upload file"
                >
                    <GoPlus size={26} className="text-lg" />
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
                    className={`absolute bottom-3 right-3 p-2.5 rounded-full transition-all duration-200 ${message.trim()
                        ? 'bg-gray-50 text-black hover:bg-white cursor-pointer'
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
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
