import Groq from "groq-sdk";
import { systemPrompt } from "./systemContext";
import { supabase } from "../supabase/supabase";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
const model = "llama-3.3-70b-versatile";

export async function sendMsg(setAiLoader) {
  setAiLoader(true);

  // 1. DB se poori history laao
  const { data: dbMessages } = await supabase
    .from("messages")
    .select("*");

  // 2. Role/content format
  const safeMsgs = dbMessages || [];  // null protection
  const messages = safeMsgs.map(m => ({
    role: m.role,
    content: m.message
  }));

  try {
    // 3. System prompt + messages → LLM
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        systemPrompt,
        ...messages
      ]
    });

    const aiResponse = completion.choices[0].message.content;

    // 4. AI reply DB me insert (use the same column name as user inserts)
    await supabase.from("messages").insert({
      role: "assistant",
      message: aiResponse
    });
  } catch (error) {
    console.log(error)
  } finally {
    setAiLoader(false);
  }
}
