import { generateText } from "ai";
import { openai } from "@/lib/openai";

const { text } = await generateText({
  model: openai("gpt-4o-mini"),
  prompt: "what is 2 + 2?",
});

console.log("🚀 ~ text:", text);
