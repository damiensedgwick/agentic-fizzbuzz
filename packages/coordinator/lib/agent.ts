import { runLLM } from "./llm";

export async function runAgent({
  message,
  tools,
}: {
  message: { task: string; number: number };
  tools: any[];
}) {
  const response = await runLLM({ messages: [], tools });

  if (response.content) {
    console.log("🚀 ~ runAgent ~ response:", response);
  }

  if (response.tool_calls) {
    const toolCall = response.tool_calls[0];
    console.log("🚀 ~ runAgent ~ toolCall:", toolCall);
  }
}
