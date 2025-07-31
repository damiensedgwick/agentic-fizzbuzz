import { z } from "zod";
import { ToolFn } from "../../types";

export const numberToolDefinition = {
  name: "number",
  parameters: z.object({}),
  description:
    "Check if the given number is not divisible by 3 or 5 and return it as a string",
};

type Args = z.infer<typeof numberToolDefinition.parameters>;

export const numberValidationTool: ToolFn<Args, string | null> = async ({
  message,
}) => {
  const { number } = JSON.parse(message);

  // Check if number is NOT divisible by 3 AND NOT divisible by 5
  if (number % 3 !== 0 && number % 5 !== 0) {
    return number.toString();
  } else {
    return null;
  }
};
