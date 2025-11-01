import React, { useRef, useState, useEffect, useContext } from 'react';
import { BsArrowUp, BsPaperclip } from 'react-icons/bs';
import UseChat from '../hooks/UseChat';
import { sendMsg } from '../api/api';
import UseAiLoader from '../hooks/UseAiLoader';
import { FaFilePdf } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export default function InputField() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const { state, dispatch } = UseChat();
    const { setAiLoader } = UseAiLoader();
    const [file, setFile] = useState(null);

    // inputField auto  re-size
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
            setMessage('');
        }
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
    console.log(formateSize(file ? file.size : ""));
    function formateSize(file) {
        if (file < 1024) return file + " Bytes";
        else if (file < 1024 * 1024) return (file / 1024).toFixed(2) + " MB";
        else return (file / (1024 * 1024)).toFixed(2) + " MB";
    }

    console.log(state)
    return (
        <div className='w-full p-4 pt-2 bg-transparent '>
            <div
                ref={textareaRef}
                className='relative bg-[#303030] text-white pb-14 shadow-xl rounded-3xl w-full max-w-3xl mx-auto z-40'
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
                    {file && (
                        <div className="absolute -top-14 z-0 text-white p-3 w-full rounded-t-2xl bg-[#303030] flex items-center justify-between">
                            <div className='flex items-center'> 
                                <FaFilePdf className="text-2xl mr-2" />
                                <div className="flex flex-col">
                                    <span>{file.name}</span>
                                    <span>{(file.size / 1024).toFixed(2)} KB</span>
                                </div></div>
                            <button
                            onClick={() => setFile(null)} 
                            className='cursor-pointer'><IoMdClose /></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
