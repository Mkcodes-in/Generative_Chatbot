import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

export default function UseChat() {
    const { state, activeChatId, setActiveChatId, chatHistoryId, setChatHistoryId } = useContext(ChatContext);
    return { state, activeChatId, setActiveChatId, chatHistoryId, setChatHistoryId };
}
