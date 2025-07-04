import { EventEmitter } from "node:events";
import ora from "ora";
import {
  fizzbuzzAgent,
  inputValidatorAgent,
  managerAgent,
  resultValidatorAgent,
} from "@/agents";

const userInput = process.argv[2];

if (!userInput) {
  console.error("Please provide a number");
  process.exit(1);
}

const run = async ({ userInput }: { userInput: string }) => {
  const spinner = ora({
    text: "👋 User input received...",
    color: "black",
  }).start();

  const bus = new EventEmitter();

  let fizzbuzzResult: string | undefined;

  bus.on("user-input-received", async () => {
    spinner.text = "📮 Messaging agents...";
    const nextAgentName = await managerAgent(userInput);
    bus.emit("task-manager-event", nextAgentName);
  });

  bus.on("task-manager-event", async (nextAgentName: string, payload?: any) => {
    spinner.text = `🤔 Activating ${nextAgentName}...`;

    switch (nextAgentName) {
      case "input-validator": {
        spinner.text = "🔍 Validating input...";
        const inputValidatorResult = await inputValidatorAgent(userInput);
        bus.emit("input-validator-event", inputValidatorResult);
        break;
      }
      case "fizzbuzz": {
        spinner.text = "🔍 Fizzbuzzing...";
        fizzbuzzResult = await fizzbuzzAgent(userInput);
        bus.emit("fizzbuzz-event", fizzbuzzResult);
        break;
      }
      case "result-validator": {
        spinner.text = "🔍 Validating result...";
        // fizzbuzzResult must be set at this point
        if (!fizzbuzzResult) {
          bus.emit(
            "task-manager-event",
            "error-message",
            "FizzBuzz result missing",
          );
          break;
        }
        const resultValidatorResult = await resultValidatorAgent(
          fizzbuzzResult,
          userInput,
        );
        bus.emit("result-validator-event", resultValidatorResult);
        break;
      }
      case "result-printer": {
        spinner.text = "🔍 Printing result...";
        // Pass the FizzBuzz result for printing
        bus.emit("result-printer-event", fizzbuzzResult);
        break;
      }
      case "error-message": {
        spinner.text = "🚨 Error message...";
        bus.emit("error-message-event", payload);
        break;
      }
    }
  });

  bus.on("input-validator-event", async (inputValidatorResult: boolean) => {
    if (inputValidatorResult) {
      return bus.emit("task-manager-event", "fizzbuzz");
    }
    return bus.emit("task-manager-event", "error-message", "Invalid input");
  });

  bus.on("fizzbuzz-event", async (result: string) => {
    fizzbuzzResult = result;
    return bus.emit("task-manager-event", "result-validator");
  });

  bus.on("result-validator-event", async (resultValidatorResult: boolean) => {
    if (resultValidatorResult) {
      return bus.emit("task-manager-event", "result-printer");
    }
    return bus.emit("task-manager-event", "error-message", "Invalid result");
  });

  bus.on("result-printer-event", async (result: string) => {
    spinner.succeed(`🎉 FizzBuzz result: ${result}`);
  });

  bus.on("error-message-event", async (errorMessage: string) => {
    spinner.fail(`🚨 Error: ${errorMessage}`);
    process.exit(1);
  });

  // initial input event
  bus.emit("user-input-received");
};

await run({ userInput });
