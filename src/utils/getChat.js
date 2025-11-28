import { supabase } from "../supabase/supabase";

export async function getChat(chatId) {
  try {
    let query = supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (chatId) {
      query = query.eq("chat_id", chatId); // filter applied
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error.message);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error From Supabase:", error.message);
    return [];
  }
}
