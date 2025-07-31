import { z } from "zod";
import { ToolFn } from "../../types";

export const buzzToolDefinition = {
  name: "buzz",
  parameters: z.object({}),
  description: "Check if the given number is divisible by 5 (a buzz number)",
};

type Args = z.infer<typeof buzzToolDefinition.parameters>;

export const buzzValidationTool: ToolFn<Args, string | null> = async ({
  message,
}) => {
  const { number } = JSON.parse(message);

  if (number % 5 === 0) {
    return "Buzz";
  } else {
    return null;
  }
};
