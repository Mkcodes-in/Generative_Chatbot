import React, { createContext, useState } from 'react'

export const AiLoaderContext = createContext();

export default function AiLoaderProvider({ children }) {
    const [aiLoader, setAiLoader] = useState(false);
    const [thinking, setThinking] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    return (
        <AiLoaderContext.Provider value={{
            aiLoader,
            setAiLoader,
            thinking,
            setThinking,
            imageLoader,
            setImageLoader
        }}>
            {children}
        </AiLoaderContext.Provider>
    )
}
