import OpenAI from "openai";
import { tools } from "./tools";
import { fizzbuzzTaskTool } from "./tools/task";

export async function runTool(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  message: string
) {
  const input = {
    message: JSON.parse(message),
    toolArgs: JSON.parse(toolCall.function.arguments),
  };

  switch (toolCall.function.name) {
    case "fizzbuzzTaskTool":
      return await fizzbuzzTaskTool(input);
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`);
  }
}
