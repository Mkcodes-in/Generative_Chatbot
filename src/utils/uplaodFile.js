import { pdfParsing } from "../parse/PdfParsing";

export async function uploadFile(file, session) {
  try {
    const text = await pdfParsing(file);
    const res = await fetch(
      "https://xmxrxqekmlwhpqbypsvm.supabase.co/functions/v1/pdf-endpoint",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`, 
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await res.json();
    console.log("EDGE RESPONSE:", data);
    return data;

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return { ok: false, error: err.message };
  }
}
