import type OpenAI from "openai";
import { fizzbuzzTool, fizzbuzzToolDefinition } from "./tools/fizzbuzz";

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  };

  if (toolCall.function.name === fizzbuzzToolDefinition.name) {
    return fizzbuzzTool(input);
  }

  return `Never run this tool: ${toolCall.function.name} again, or else!`;
};
