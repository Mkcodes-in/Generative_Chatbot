import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { getChat } from '../utils/getChat';

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
    const [state, setState] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [ChatHistoryId, setChatHistoryId] = useState(null);

    // fetch data from server
    useEffect(() => {
        (async () => {
            try {
                if (!ChatHistoryId) {
                    setState([]); 
                    return;
                }

                const data = await getChat(ChatHistoryId);
                if (Array.isArray(data)) setState(data);

            } catch (err) {
                console.error('Failed to load chat messages:', err.message);
            }
        })();

        // subscribe for realtime database
        const channel = supabase
            .channel('chat-realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload) => {
                    if (payload.new) {
                        setState(prev => [...prev, payload.new]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    }, [ChatHistoryId]);

    return (
        <ChatContext.Provider value={{ state, activeChatId, setActiveChatId, ChatHistoryId, setChatHistoryId }}>
            {children}
        </ChatContext.Provider>
    )
}
