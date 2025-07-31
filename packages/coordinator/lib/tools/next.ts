import { z } from "zod";
import { ToolFn } from "../../types";
import { sendToAgent } from "../communication";

export const nextToolDefinition = {
  name: "next",
  parameters: z.object({}),
  description:
    "Determine the next agent to execute the task and send the request to that agent",
};

type Args = z.infer<typeof nextToolDefinition.parameters>;

export const nextTool: ToolFn<Args, string> = async ({ message }) => {
  const { number } = JSON.parse(message);

  // Determine which agent should process this number
  let agentName: string;

  if (number % 5 === 0 && number % 3 === 0) {
    agentName = "fizzbuzz";
  } else if (number % 5 === 0) {
    agentName = "buzz";
  } else if (number % 3 === 0) {
    agentName = "fizz";
  } else {
    agentName = "number";
  }

  console.log(
    `🔄 [COORDINATOR] Routing number ${number} to ${agentName} agent`
  );

  try {
    // Send the request to the determined agent
    const response = await sendToAgent(agentName, number);

    console.log(
      `📨 [COORDINATOR] Received response from ${agentName} agent: ${response.result}`
    );

    // Return the result from the agent
    return response.result || number.toString();
  } catch (error) {
    console.error(
      `🚨 [COORDINATOR] Error sending to ${agentName} agent:`,
      error
    );
    throw new Error(`Failed to communicate with ${agentName} agent: ${error}`);
  }
};
