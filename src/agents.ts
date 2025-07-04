import { generateText } from "ai";
import { openai } from "@/lib/openai";

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
        `,
  });

  return text;
};

export const inputValidatorAgent = async (input: string) => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: `
        You are a helpful assistant that can help with FizzBuzz input validation.
        
        - The user has provided a number and you need to validate it.
        - The number is ${input}.
        - The result should be a boolean.
        - If the number is not a number, you should return false.
        - If the number is a number, you should return true.
        `,
  });

  return text;
};

export const fizzbuzzAgent = async (input: string) => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: `
        You are a helpful assistant that can help with FizzBuzz.
        
        - The user has provided a number and you need to fizzbuzz it.
        - The number is ${input}.
        - The result should be a string.
        `,
  });

  return text;
};

export const resultValidatorAgent = async (input: string) => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: `
        You are a helpful assistant that can help with FizzBuzz result validation.

        - The user has provided a number and you need to validate the result.
        - The result is ${input}.
        - The result should be a boolean.
        - If the result is not a string, you should return false.
        - If the result is a string, you should return true.
        `,
  });

  return text;
};
