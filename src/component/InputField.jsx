import React, { useRef, useState } from 'react';
import { BsArrowUp, BsFileEarmarkPdfFill } from 'react-icons/bs';
import { sendMsg } from '../api/api';
import UseAiLoader from '../hooks/UseAiLoader';
import { supabase } from '../supabase/supabase';
import UseChat from '../hooks/UseChat';
import { GoPlus } from 'react-icons/go';
import { uploadFile } from '../utils/uplaodFile';
import { BiX } from 'react-icons/bi';
import Loader from './Loader';
import { LuLoader } from 'react-icons/lu';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function InputField() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const { setAiLoader } = UseAiLoader();
    const { activeChatId } = UseChat();
    const fileInputRef = useRef();
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState(null);

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
        const { data: { user } } = await supabase.auth.getUser();
        const userMsg = { role: "user", message: message, "chat_id": activeChatId, "user_id": user.id };

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
        if (!selectedFile) return;

        setUploading(true);
        setFileName({
            name: selectedFile.name,
            type: selectedFile.type
        });

        try {
            const response = await uploadFile(selectedFile);
            if (response?.ok) {
                console.log("PDF successfully added to knowledge base!");
            } else {
                alert("Failed to ingest PDF");
                console.log("FAILED RESPONSE:", response);
            }
        } catch (error) {
            alert("PDF upload failed: " + error.message);
            setUploading(null);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="w-full bg-transparent px-4">
            <div
                className={`relative bottom-5 bg-[#303030] text-white shadow-lg w-full max-w-3xl mx-auto z-30 py-3 overflow-hidden transition-all duration-100 ${message || fileName ? "rounded-3xl pb-12 px-4" : "rounded-full px-13"}`}
            >
                {/* uploading */}
                {fileName && (
                    <div className="flex items-center justify-between bg-gray-50/10 border border-gray-700/50 mb-3 px-4 py-3 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                <BsFileEarmarkPdfFill />
                            </div>

                            {/* File details */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white">
                                        {fileName.name}
                                    </span>
                                    {uploading && (
                                        <div className='absolute left-8 top-6'>
                                            <AiOutlineLoading3Quarters size={41} className='animate-spin' />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right side - Remove button */}
                        <button
                            onClick={() => {
                                if (fileInputRef.current) fileInputRef.current.value = '';
                                setFileName(null);
                            }}
                            className="p-1.5 hover:bg-gray-100/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Remove file"
                        >
                            <BiX size={20} />
                        </button>
                    </div>
                )}

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
                    <GoPlus
                        size={26}
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer"
                    />
                </label>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="application/pdf"
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
