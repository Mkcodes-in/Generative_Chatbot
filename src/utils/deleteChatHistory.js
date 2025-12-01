import { supabase } from "../supabase/supabase";

export async function deleteChatHistory(chat_id) {
    try {
        await supabase.from("messages")
        .delete()
        .eq("chat_id", chat_id);
    } catch (error) {
        console.error("error: ", error);
    }
};