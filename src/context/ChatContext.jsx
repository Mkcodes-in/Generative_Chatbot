import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { getChat } from "../utils/getChat";
import { fetchChat } from "../utils/fetchChat";

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
    const [state, setState] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [chatHistoryId, setChatHistoryId] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);

    // ----------- MESSAGES REALTIME -------------
    useEffect(() => {
        (async () => {
            if (!chatHistoryId) {
                setState([]);
                return;
            }

            const data = await getChat(chatHistoryId);
            if (Array.isArray(data)) setState(data);
        })();

        const channel = supabase
            .channel("chat-realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                (payload) => {
                    if (payload.new) {
                        setState((prev) => [...prev, payload.new]);
                    }
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [chatHistoryId]);

    // ----------- HISTORY REALTIME -------------
    useEffect(() => {
        const channel = supabase
            .channel("chat-history-realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                async () => {
                    const res = await fetchChat(); // fetch all chats
                    const response = res?.data || [];

                    const unique = [];
                    const map = new Map();

                    response.forEach((e) => {
                        if (!e.message) return;
                        if (!map.has(e.chat_id)) {
                            map.set(e.chat_id, e.message);
                            unique.push({
                                chat_id: e.chat_id,
                                title: e.message,
                            });
                        }
                    });

                    setChatHistory(unique);
                }
            )
            .subscribe();

        // INITIAL LOAD (important)
        (async () => {
            const res = await fetchChat();
            const response = res?.data || [];

            const unique = [];
            const map = new Map();

            response.forEach((e) => {
                if (!e.message) return;
                if (!map.has(e.chat_id)) {
                    map.set(e.chat_id, e.message);
                    unique.push({
                        chat_id: e.chat_id,
                        title: e.message,
                    });
                }
            });

            setChatHistory(unique);
        })();

        return () => supabase.removeChannel(channel);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                state,
                setState,
                activeChatId,
                setActiveChatId,
                chatHistoryId,
                setChatHistoryId,
                chatHistory,
                setChatHistory,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}
