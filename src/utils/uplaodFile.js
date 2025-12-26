import { chunkingText } from "../helper/chunking";
import { pdfParsing } from "../parse/PdfParsing";
import { supabase } from "../supabase/supabase";
const session = await supabase.auth.getSession();

export async function uploadFile(file) {
  try {
    const text = await pdfParsing(file);
    const chunks = chunkingText(text);

    for (const chunk of chunks) {
      await fetch(import.meta.env.VITE_SUPABASE_EDGE_FUNCTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
        body: JSON.stringify({ text: chunk }),
      });
    }

    return { ok: true };

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return { ok: false, error: err.message };
  }
}

