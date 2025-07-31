import { runLLM } from "./llm";
import { addMessages, getMessages, saveToolResponse } from "./memory";

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
      return getMessages();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      console.log("🚀 ~ runAgent ~ toolCall:", toolCall);

      const toolResponse = await saveToolResponse(
        toolCall.id,
        toolCall.function.arguments
      );
      console.log("🚀 ~ runAgent ~ toolResponse:", toolResponse);
    }
  }
}
