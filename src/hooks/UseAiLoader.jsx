import React, { useContext } from 'react'
import { AiLoaderContext } from '../context/AiLoader'

export default function UseAiLoader() {
    const {aiLoader, setAiLoader} = useContext(AiLoaderContext);
    return {aiLoader, setAiLoader};
}
