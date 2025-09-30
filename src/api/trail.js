import OpenAI from "openai";

const client = new OpenAI({
    apiKey: "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",
    baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: "Explain the importance of fast language models",
});
console.log(response.output_text);

