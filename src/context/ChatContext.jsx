import React, { createContext, useEffect, useState } from 'react';
import { getChat } from '../utilits/getChat';

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
    const [state, setState] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getChat();
                if (Array.isArray(data)) setState(data);
            } catch (err) {
                console.error('Failed to load chat messages:', err);
            }
        })();
    }, []);

    return (
        <ChatContext.Provider value={{ state }}>
            {children}
        </ChatContext.Provider>
    )
}
