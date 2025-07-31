import { z } from "zod";
import { ToolFn } from "../../types";

export const taskToolDefinition = {
  name: "task",
  parameters: z.object({
    message: z.string().describe("The message containing the task information"),
  }),
  description: "Check if the given task is a fizzbuzz task",
};

type Args = z.infer<typeof taskToolDefinition.parameters>;

export const fizzbuzzTaskTool: ToolFn<Args, boolean> = async ({ message }) => {
  const { task } = JSON.parse(message);

  return task === "fizzbuzz";
};
