import { supabase } from "../supabase/supabase";

export async function getChat(){
    try {
        const {data} = (await supabase.from("messages").select("*").order("created_at", {ascending: true}));
        return data;
    } catch (error) {
        console.error("Error From Supbase :", error);
    }
}