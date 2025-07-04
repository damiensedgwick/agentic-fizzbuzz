import { createOpenAI } from "@ai-sdk/openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

export const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
  compatibility: "strict",
});
