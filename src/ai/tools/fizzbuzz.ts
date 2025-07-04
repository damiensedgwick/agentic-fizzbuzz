import z from "zod";
import { fizzbuzz } from "../../lib/fizzbuzz.ts";
import type { ToolFn } from "../../types.ts";

export const fizzbuzzToolDefinition = {
  name: "fizzbuzz",
  description:
    "Fizzbuzz is a game where you count from 1 to 100, replacing numbers divisible by 3 with 'Fizz', numbers divisible by 5 with 'Buzz', and numbers divisible by both 3 and 5 with 'FizzBuzz'.",
  parameters: z.object({
    number: z.number().describe("The number to fizzbuzz"),
  }),
};

type Args = z.infer<typeof fizzbuzzToolDefinition.parameters>;

export const fizzbuzzTool: ToolFn<Args, string> = async ({ userMessage }) => {
  const number = Number(userMessage);

  if (Number.isNaN(number)) {
    throw new Error("Invalid number");
  }

  const result = fizzbuzz(number);

  return result;
};
