import { runLLM } from "./llm";
import { addMessages, getMessages, saveToolResponse } from "./memory";
import { toolImplementations } from "./tools";

export async function runAgent({
  message,
  tools: toolDefinitions,
}: {
  message: { number: number };
  tools: any[];
}) {
  await addMessages([{ role: "user", content: JSON.stringify(message) }]);

  while (true) {
    const history = await getMessages();
    const response = await runLLM({
      messages: history,
      tools: toolDefinitions,
    });

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
