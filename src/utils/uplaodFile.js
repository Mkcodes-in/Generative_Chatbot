import * as pdfjsLib from "pdfjs-dist/webpack";

export async function uploadFile(file) {
    if (!file) throw new Error("No file selected");

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF using pdf.js
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
    }

    // Send extracted text to Edge Function
    const res = await fetch(
        "https://xmxrxqekmlwhpqbypsvm.supabase.co/functions/v1/ingestPdf",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: fullText }),
        }
    );

    // 👇 IMPORTANT FIX HERE
    const data = await res.json();

    console.log("Response from Edge Function:", data);

    return data;
}
