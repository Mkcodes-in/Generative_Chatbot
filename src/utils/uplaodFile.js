import { supabase } from "../supabase/supabase";

export async function uploadFile(file) {
  try {
    console.log("Uploading file:", file);

    const filePath = `files/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("pdfs")
      .upload(filePath, file);

    if (error) {
      console.error("Upload Error:", error);
      throw error;
    }

    console.log("Uploaded successfully:", data);

    return {
      success: true,
      path: filePath
    };

  } catch (err) {
    console.error("UPLOAD FAILED:", err);
    return { success: false, error: err.message };
  }
}
