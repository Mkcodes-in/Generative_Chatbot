import { supabase } from "../supabase/supabase";

export async function fetchChat() {
    try {
        const data = await supabase
            .from("messages")
            .select("chat_id")
            .not("chat_id", "is", null)
            .order("created_at", { ascending: false });
        // console.log(data)
        return data;
    } catch (error) {
        console.error("Error : ", error);
    }
}