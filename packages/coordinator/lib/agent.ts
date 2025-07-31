import { runLLM } from "./llm";
import { addMessages, getMessages, saveToolResponse } from "./memory";
import { fizzbuzzTaskTool } from "./tools/task";
import { ToolFn } from "../types";

// Map tool names to their implementations
const toolImplementations: Record<string, ToolFn> = {
  task: fizzbuzzTaskTool,
};

export async function runAgent({
  message,
  tools,
}: {
  message: { task: string; number: number };
  tools: any[];
}) {
  await addMessages([{ role: "user", content: JSON.stringify(message) }]);

  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });

    if (response.content) {
      console.log("🚀 ~ runAgent ~ response:", response);
      // Add the assistant's response to the conversation
      await addMessages([response]);
      return getMessages();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      console.log("🚀 ~ runAgent ~ toolCall:", toolCall);

      // Add the assistant's response (with tool calls) to the conversation
      await addMessages([response]);

      // Execute the tool
      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);

      if (toolImplementations[toolName]) {
        const result = await toolImplementations[toolName]({
          message: JSON.stringify(message),
          toolArgs,
        });

        const toolResponse = await saveToolResponse(
          toolCall.id,
          JSON.stringify({ result })
        );
        console.log("🚀 ~ runAgent ~ toolResponse:", toolResponse);
      } else {
        console.error(`Unknown tool: ${toolName}`);
      }
    }
  }
}
