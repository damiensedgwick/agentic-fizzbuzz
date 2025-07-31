import { runLLM } from "./llm";
import { addMessages, getMessages, saveToolResponse } from "./memory";
import { fizzbuzzTaskTool } from "./tools/task";
import { ToolFn } from "../types";

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
      await addMessages([response]);
      return getMessages();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];

      await addMessages([response]);

      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);

      if (toolImplementations[toolName]) {
        const result = await toolImplementations[toolName]({
          message: JSON.stringify(message),
          toolArgs,
        });

        await saveToolResponse(toolCall.id, JSON.stringify({ result }));
      } else {
        console.error(`Unknown tool: ${toolName}`);
      }
    }
  }
}
