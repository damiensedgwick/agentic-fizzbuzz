import { generateText } from "ai";
import { openai } from "@/lib/openai";

const agentNames = [
  "input-validator",
  "fizzbuzz",
  "result-validator",
  "result-printer",
  "error-message",
];

export const managerAgent = async (input: string) => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: `
        You are a helpful assistant that manages the flow of the FizzBuzz application.
        
        - The user has provided a number and you need manage the other agents.
        - When you receive the user input, you will need to pass it to the input validator agent.
        - If the validator agent returns a valid input, you will need to pass it to the fizzbuzz agent.
        - Once the fizzbuzz agent has returned a result, you will need to pass it to the result validator agent.
        - If the result validator agent returns a valid result, you will need to pass it to the result printer agent.
        - If the result validator agent returns an invalid result, you will need inform the error message agent to inform the user of the error.
        - The user input is ${input}.
        - The next agent to be activated must be called by the name of the agent.
        - The agent names are: ${agentNames.join(", ")}.
        - You must return the name of the next agent to be activated.
        `,
  });

  return text;
};

export const inputValidatorAgent = async (input: string) => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: `
        You are a helpful assistant that can help with FizzBuzz user input validation.
        
        - The user has provided a number and you need to validate it.
        - The number is ${input}.
        - The number should be a positive integer.
        - The number should be between 1 and 100.
        - If the number is not a positive integer or is not between 1 and 100, you should return false.
        - If the number is a positive integer and is between 1 and 100, you should return true.
        - If validation fails, can you give me a reason why?
        `,
  });

  return Boolean(text);
};

export const fizzbuzzAgent = async (input: string) => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: `
        You are a helpful assistant that can help with FizzBuzz.
        
        - The user has provided a number and you need to fizzbuzz it.
        - The number is ${input}.
        - The result should be a string.
        - You can only return Fizz, Buzz, FizzBuzz or the number itself.
        - You can not return anything else.
        `,
  });

  return text;
};

export const resultValidatorAgent = async (result?: string, input?: string) => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: `
        You are a helpful assistant that can help with FizzBuzz result validation.

        - The user has provided a number and you need to validate the generated result.
        - The result is ${result} and the user input is ${input}.
        - The result should be a string.
        - The result can be Fizz, Buzz, FizzBuzz or the number itself.
        - You should return true if the result is valid, otherwise return false.
        `,
  });

  return Boolean(text);
};
