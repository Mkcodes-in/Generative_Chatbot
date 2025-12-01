import { supabase } from "../supabase/supabase";

export function deleteChatHistory(chat_id) {
    return supabase
        .from('messages')
        .delete()
        .eq('chat_id', chat_id);
};