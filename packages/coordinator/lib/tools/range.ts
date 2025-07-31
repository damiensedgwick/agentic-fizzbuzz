import { z } from "zod";
import { ToolFn } from "../../types";

export const rangeToolDefinition = {
  name: "range",
  parameters: z.object({}),
  description: "Check if the given range is a valid range",
};

type Args = z.infer<typeof rangeToolDefinition.parameters>;

export const rangeTool: ToolFn<Args, boolean> = async ({ message }) => {
  const { number } = JSON.parse(message);

  return number >= 1 && number <= 100;
};
