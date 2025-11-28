import Groq from "groq-sdk";
import { systemPrompt } from "./systemContext";
import { supabase } from "../supabase/supabase";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
const model = "llama-3.3-70b-versatile";

export async function sendMsg(activeChatId, setAiLoader) {
  setAiLoader(true);

  const { data: dbMessages } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", activeChatId)
    .order("created_at", {ascending: true});

  const safeMsgs = dbMessages || []; 
  const messages = safeMsgs.map(m => ({
    role: m.role,
    content: m.message
  }));

  try {
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        systemPrompt,
        ...messages
      ]
    });

    const aiResponse = completion.choices[0].message.content;

    await supabase.from("messages").insert({
      role: "assistant",
      message: aiResponse, 
      chat_id: activeChatId
    });
  } catch (error) {
    console.log(error)
  } finally {
    setAiLoader(false);
  }
}
