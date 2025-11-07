import React, { createContext, useState } from 'react'

export const PdfContext = createContext();

export default function PdfProvider({children}) {
    const [pdfText, setPdfText] = useState("");
    const [loading, setLoading] = useState(false);

  return (
    <PdfContext.Provider value={{pdfText, setPdfText, loading, setLoading}}>
        {children}
    </PdfContext.Provider>
  )
}
