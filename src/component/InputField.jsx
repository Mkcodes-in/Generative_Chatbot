import React, { useRef, useState } from 'react';
import { BsArrowUp, BsFileEarmarkPdfFill } from 'react-icons/bs';
import { sendMsg } from '../api/api';
import UseAiLoader from '../hooks/UseAiLoader';
import { supabase } from '../supabase/supabase';
import UseChat from '../hooks/UseChat';
import { GoPlus } from 'react-icons/go';
import { uploadFile } from '../utils/uplaodFile';
import { BiX } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { handleUpload } from '../utils/storageFile';
import { needsPdfSearch } from '../utils/needPdfSearch';
import { question_embedding } from '../api/embedding';
import { useUser } from '../hooks/UseUser';
import { ImImages } from 'react-icons/im';
import { generate_Image } from '../utils/generateImage';

export default function InputField() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const { setAiLoader, setThinking, setImageLoader } = UseAiLoader();
    const { activeChatId } = UseChat();
    const { userSession } = useUser();
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);
    const [activeMode, setActiveMode] = useState(false);

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

        const currentMessage = message;
        setMessage('');

        const userMsg = {
            role: "user",
            message: currentMessage,
            chat_id: activeChatId,
            user_id: userSession.id,
            file_name: file ? fileName.name : null,
            file_type: file ? fileName.type : null,
            message_type: 'text'
        };

        await supabase.from("messages").insert(userMsg);

        if (activeMode === true) {
            try {
                setImageLoader(true);
                const data = await generate_Image(message, activeChatId);

                if (data?.ok) {
                    const imageMsg = {
                        role: "assistant",
                        message: data.image_url,
                        chat_id: activeChatId,
                        user_id: userSession.id,
                        file_name: file ? fileName.name : null,
                        file_type: file ? fileName.type : null,
                        message_type: 'image'
                    }

                    await supabase.from('messages').insert(imageMsg);
                    return;
                }
            } catch (error) {
                console.error("Error " + error.message);
            } finally {
                setImageLoader(false);
            }
        }

        if (file) {
            try {
                await handleUpload(file, activeChatId);
            } catch (error) {
                console.error("File upload error:", error);
            }
        }

        try {
            if (needsPdfSearch(currentMessage)) {
                setThinking(true);
                await question_embedding(currentMessage, activeChatId, userSession.id);
            } else {
                setAiLoader(true);
                await sendMsg(activeChatId, userSession);
            }
        } catch (error) {
            console.error('error: ', error);
        } finally {
            setAiLoader(false);
            setThinking(false);
        }

        setFile(null);
        setFileName(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
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
        setFile(selectedFile);
        // console.log(selectedFile)
        if (!selectedFile) return;

        setUploading(true);
        setFileName({
            name: selectedFile.name,
            type: selectedFile.type
        });

        try {
            const response = await uploadFile(selectedFile, activeChatId);
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
                className={`relative bottom-5 bg-[#303030] text-white shadow-lg w-full max-w-3xl mx-auto z-30 py-3 overflow-hidden transition-all duration-100 rounded-3xl pb-12 px-4`}
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

                        {/* Right side */}
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
                 hover:bg-gray-50/10 text-white cursor-pointer border border-gray-50/20"
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

                <button
                    onClick={() => setActiveMode(prev => !prev)}
                    className={`absolute flex items-center gap-2 px-2 bottom-2.5 left-12 p-1 rounded-full text-white cursor-pointer border border-gray-50/20 ${activeMode ? "bg-blue-800/60" : "hover:bg-gray-50/10"}`}
                >
                    <ImImages size={15} /> Create image
                </button>

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
