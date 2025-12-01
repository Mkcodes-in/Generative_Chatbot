import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

export default function UseChat() {
    const { state, setState, activeChatId, setActiveChatId, chatHistoryId, setChatHistoryId } = useContext(ChatContext);
    return { state,setState, activeChatId, setActiveChatId, chatHistoryId, setChatHistoryId };
}
