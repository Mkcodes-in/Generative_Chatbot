import Groq from "groq-sdk";
import { supabase } from "../supabase/supabase";
import { systemPrompt } from "./systemContext";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
const model = "openai/gpt-oss-120b";

export async function sendMsg(activeChatId) {
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

    // get chat history
    const { data: chatHistory } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', activeChatId)
      .order('created_at', { ascending: false });

    const historyMessages = chatHistory?.map((msg) => ({
      role: msg.role,
      content: msg.message
    })) || [];

    // limited chat history for LLM
    const limitedMsg = historyMessages.slice(-8);

    // LLM context with chatHistory
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: systemPrompt.role,
          content: systemPrompt.content
        },
        ...limitedMsg,
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
  }
}
