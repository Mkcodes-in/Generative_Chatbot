import React, { createContext, useEffect, useState } from 'react';
import { getChat } from '../utilits/getChat';
import { supabase } from '../supabase/supabase';

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
        <ChatContext.Provider value={{ state }}>
            {children}
        </ChatContext.Provider>
    )
}
