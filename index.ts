import ora from "ora";
import {
  fizzbuzzAgent,
  inputValidatorAgent,
  resultValidatorAgent,
} from "@/agents";

const userInput = process.argv[2];

if (!userInput) {
  console.error("Please provide a number");
  process.exit(1);
}

const run = async ({ userInput }: { userInput: string }) => {
  const spinner = ora({
    text: "🤔",
    color: "black",
  }).start();

  const inputValidatorResult = await inputValidatorAgent(userInput);
  spinner.text = `🔍 Validating input...`;

  const fizzbuzzResult = await fizzbuzzAgent(userInput);
  spinner.text = `🔍 Fizzbuzzing...`;

  const resultValidatorResult = await resultValidatorAgent(fizzbuzzResult);
  spinner.text = `🔍 Validating result...`;

  spinner.succeed(`🎉 FizzBuzz result: ${fizzbuzzResult}`);
};

await run({ userInput });
