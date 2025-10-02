import React, { createContext, useState } from 'react'

export const AiLoaderContext = createContext();

export default function AiLoaderProvider({ children }) {
    const [aiLoader, setAiLoader] = useState(false);
    return (
        <AiLoaderContext.Provider value={{ aiLoader, setAiLoader }}>
            {children}
        </AiLoaderContext.Provider>
    )
}
