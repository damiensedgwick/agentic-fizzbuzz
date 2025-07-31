import { z } from "zod";
import { ToolFn } from "../../types";

export const fizzToolDefinition = {
  name: "fizz",
  parameters: z.object({}),
  description: "Check if the given number is divisible by 3 (a fizz number)",
};

type Args = z.infer<typeof fizzToolDefinition.parameters>;

export const fizzValidationTool: ToolFn<Args, string | null> = async ({
  message,
}) => {
  const { number } = JSON.parse(message);

  // Check if number is divisible by 3
  if (number % 3 === 0) {
    return "Fizz";
  } else {
    return null;
  }
};
