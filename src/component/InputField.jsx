import React, { useRef, useState, useEffect, useContext } from 'react';
import { BsArrowUp, BsPaperclip } from 'react-icons/bs';
import { sendMsg } from '../api/api';
import UseAiLoader from '../hooks/UseAiLoader';
import { FaFilePdf, FaPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { supabase } from '../supabase/supabase';
import UseChat from '../hooks/UseChat';
import { GoPlus } from 'react-icons/go';
import { uploadFile } from '../utils/uplaodFile';

export default function InputField() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const { setAiLoader } = UseAiLoader();
    const { activeChatId } = UseChat();
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
        if (!activeChatId) return console.error("No active chat ID found.");

        const userMsg = { role: "user", message: message, "chat_id": activeChatId };

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
    async function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        if(!selectedFile) return;

        try {
            const response = await uploadFile(selectedFile);
            if(response.success) {
                alert("PDF successfully added to knowledge base!")
            }
            else{
                alert("Failed to ingest PDF");
            }
        } catch (error) {
            alert("PDF upload failed: " + error.message);
        }
    }

    return (
        <div className="w-full bg-transparent px-4">
            <div
                className={`relative bottom-5 bg-[#303030] text-white shadow-lg w-full max-w-3xl mx-auto z-30 py-3 overflow-hidden transition-all duration-100 ${message ? "rounded-3xl pb-12 px-4" : "rounded-full px-12"}`}
            >
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full text-md resize-none border-none outline-none 
                    bg-transparent overflow-auto"
                    rows={1}
                />

                {/* File Upload */}
                <label
                    htmlFor="file"
                    className="absolute bottom-2.5 left-2 p-1 rounded-full 
                 hover:bg-gray-50/10 text-white cursor-pointer"
                >
                    <GoPlus size={26} />
                </label>

                <input
                    type="file"
                    id="file"
                    className="hidden"
                    accept='application/pdf'
                    onChange={handleFileChange}
                />

                {/* Send Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                    className={`absolute bottom-2 right-2 p-2.5 rounded-full transition-all 
                    duration-200 ${message.trim()
                            ? "bg-gray-50 text-black hover:bg-white cursor-pointer"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                >
                    <BsArrowUp className="text-lg font-bold" />
                </button>
            </div>
        </div>
    );
}
