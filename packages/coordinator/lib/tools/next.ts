import { z } from "zod";
import { ToolFn } from "../../types";

export const nextToolDefinition = {
  name: "next",
  parameters: z.object({}),
  description: "Determine the next agent to execute the task",
};

type Args = z.infer<typeof nextToolDefinition.parameters>;

export const nextTool: ToolFn<Args, string> = async ({ message }) => {
  const { number } = JSON.parse(message);

  if (number % 5 === 0 && number % 3 === 0) {
    return "fizzbuzz";
  }

  if (number % 5 === 0) {
    return "buzz";
  }

  if (number % 3 === 0) {
    return "fizz";
  }

  return "number";
};
