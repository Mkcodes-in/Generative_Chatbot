import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

export default function UseChat() {
    const { state, dispatch } = useContext(ChatContext);
    return { state, dispatch };
}
