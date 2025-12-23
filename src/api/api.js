import Groq from "groq-sdk";
import { supabase } from "../supabase/supabase";
import { systemPrompt } from "./systemContext";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
const model = "llama-3.3-70b-versatile";

export async function sendMsg(activeChatId, setAiLoader) {
  setAiLoader(true);

  try {
    // get user
    const { data: { user } } = await supabase.auth.getUser();

    // get last user message
    const { data: msgs } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", activeChatId)
      .order("created_at", { ascending: false })
      .limit(1);

    const userMessage = msgs?.[0]?.message;

    // LLM context with chatHistory
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: systemPrompt.role,
          content: systemPrompt.content
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    const aiResponse = completion.choices[0].message.content;

    // store AI message
    await supabase.from("messages").insert({
      role: "assistant",
      message: aiResponse,
      chat_id: activeChatId,
      user_id: user.id
    });

  } catch (error) {
    console.error("sendMsg error", error);
  } finally {
    setAiLoader(false);
  }
}
