import Groq from "groq-sdk";
import { supabase } from "../supabase/supabase";

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

    // get file_path from chats table
    const { data: chatRow } = await supabase
      .from("chats")
      .select("file_path")
      .eq("id", activeChatId)
      .single();

    const filePath = chatRow.file_path;

    // Vector Search → Get PDF chunks
    const { data: chunks } = await supabase.rpc("match_documents", {
      query: userMessage,
      file_path: filePath,
    });

    const context = chunks.map(c => c.content).join("\n\n");

    // Send to Groq with PDF context
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `Use the following PDF context to answer:\n\n${context}`
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
    console.error("sendMsg error →", error);
  } finally {
    setAiLoader(false);
  }
}
