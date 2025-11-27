import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { getChat } from '../utils/getChat';

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
    const [state, setState] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);

    // fetch data from server
    useEffect(() => {
        (async () => {
            try {
                const data = await getChat();
                if (Array.isArray(data)) setState(data);
            } catch (err) {
                console.error('Failed to load chat messages:', err);
            }
        })();

        // subscribe for realtime database
        const channel = supabase
            .channel('chat-realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload) => {
                    console.log("Realtime Update:", payload);
                    if (payload.new) {
                        setState(prev => [...prev, payload.new]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    }, []);

    return (
        <ChatContext.Provider value={{ state, activeChatId, setActiveChatId }}>
            {children}
        </ChatContext.Provider>
    )
}
