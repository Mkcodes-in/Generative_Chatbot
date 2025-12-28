import { supabase } from "../supabase/supabase";

// uplaod file logic to upload 
export const handleUpload = async (fileToUpload, activeChatId) => {
    if (!fileToUpload || !activeChatId) {
        console.warn("Missing file or chat ID for upload");
        return;
    }

    try {
        const filePath = `${activeChatId}/${fileToUpload.name}`;
        const { error, data } = await supabase.storage
            .from('documents')
            .upload(filePath, fileToUpload);

        if (error) {
            console.error("Supabase upload error:", error);
            throw new Error(error.message || "Upload failed");
        }

        console.log("File uploaded successfully:", data);
        return { success: true, data };
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}