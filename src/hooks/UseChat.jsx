import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

export default function UseChat() {
    const { state, activeChatId, setActiveChatId } = useContext(ChatContext);
    return { state, activeChatId, setActiveChatId };
}
