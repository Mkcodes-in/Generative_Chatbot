import Groq from "groq-sdk";
import { systemPrompt } from "./systemContext";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
const model = "llama-3.3-70b-versatile";

export async function sendMsg(messages, dispatch) {

  const messagesWithSystem = [
    systemPrompt,
    ...messages
  ]

  try {
    const completion = await groq.chat.completions.create({
      model: model,
      messages: messagesWithSystem,
    });

    const aiResponse = completion.choices[0].message.content;

    const assistantMsg = { role: "assistant", content: aiResponse };

    dispatch({ type: "SET_MSG", payload: assistantMsg });

  } catch (error) {

    console.error("Groq API error:", error);

  }
}
