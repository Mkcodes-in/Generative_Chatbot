import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';

export default function UsePDF() {
    const { pdfText, setPdfText, loading, setLoading } = useContext(ChatContext);
    return { pdfText, setPdfText, loading, setLoading };
}
