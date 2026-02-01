import React, { useContext } from 'react'
import { AiLoaderContext } from '../context/AiLoader'

export default function UseAiLoader() {
    const {
        aiLoader,
        setAiLoader, thinking,
        setThinking,
        imageLoader,
        setImageLoader
    } = useContext(AiLoaderContext);
    return {
        aiLoader,
        setAiLoader,
        thinking,
        setThinking,
        imageLoader,
        setImageLoader
    };
}
