import { z } from "zod";
import { ToolFn } from "../../types";

export const fizzbuzzToolDefinition = {
  name: "fizzbuzz",
  parameters: z.object({}),
  description:
    "Check if the given number is divisible by both 3 and 5 (a fizzbuzz number)",
};

type Args = z.infer<typeof fizzbuzzToolDefinition.parameters>;

export const fizzbuzzValidationTool: ToolFn<Args, string | null> = async ({
  message,
}) => {
  const { number } = JSON.parse(message);

  if (number % 3 === 0 && number % 5 === 0) {
    return "FizzBuzz";
  } else {
    return null;
  }
};
