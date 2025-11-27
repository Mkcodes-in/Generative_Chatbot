import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

export default function UseChat() {
    const { state, refresh, appendMessage, activeChatId, setActiveChatId } = useContext(ChatContext);
    return { state, refresh, appendMessage, activeChatId, setActiveChatId };
}
