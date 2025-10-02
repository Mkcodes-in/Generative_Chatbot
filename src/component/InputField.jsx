import React, { useRef, useState, useEffect, useContext } from 'react';
import { BsArrowUp, BsPaperclip } from 'react-icons/bs';
import UseChat from '../hooks/UseChat';
import { sendMsg } from '../api/api';
import UseAiLoader from '../hooks/UseAiLoader';

export default function InputField() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const { state, dispatch } = UseChat();
    const {setAiLoader} = UseAiLoader();

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        const textArea = textareaRef.current;
        textArea.style.height = "auto";
        textArea.style.height = Math.min(textArea.scrollHeight, 150) + "px";
    };

    const handleSubmit = () => {
        const userMsg = { role: "user", content: message }
        dispatch({ type: "SET_MSG", payload: userMsg });
        sendMsg([...state.messages, userMsg], dispatch, setAiLoader);
        if (message.trim()) {
            console.log('Message sent:', message);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className='w-full p-4 pt-2 bg-transparent'>
            <div
                ref={textareaRef}
                className='relative bg-[#303030] text-white pb-14 shadow-xl rounded-3xl w-full max-w-3xl mx-auto'
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
                <input className='hidden' type="file" id="file" />

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
            </div>
        </div>
    );
}
