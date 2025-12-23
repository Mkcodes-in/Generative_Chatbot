import { pdfParsing } from "../parse/PdfParsing";
import { supabase } from "../supabase/supabase";
const session = await supabase.auth.getSession();

export async function uploadFile(file) {
  try {
    const text = await pdfParsing(file);
    const res = await fetch(import.meta.env.VITE_SUPABASE_EDGE_FUNCTION,
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
