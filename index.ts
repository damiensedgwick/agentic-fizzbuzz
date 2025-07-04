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

  bus.on("user-input-received", async () => {
    spinner.text = "📮 Messaging agents...";
    const nextAgentName = await managerAgent(userInput);
    bus.emit("task-manager-event", nextAgentName);
  });

  bus.on("task-manager-event", async (nextAgentName: string) => {
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
        const fizzbuzzResult = await fizzbuzzAgent(userInput);
        bus.emit("fizzbuzz-event", fizzbuzzResult);
        break;
      }
      case "result-validator": {
        spinner.text = "🔍 Validating result...";
        const resultValidatorResult = await resultValidatorAgent(userInput);
        bus.emit("result-validator-event", resultValidatorResult);
        break;
      }
      case "error-message": {
        spinner.text = "🚨 Error message...";
        bus.emit("error-message-event", "Invalid input");
        break;
      }
    }
  });

  bus.on("input-validator-event", async (inputValidatorResult: boolean) => {
    if (inputValidatorResult) {
      bus.emit("task-manager-event", "fizzbuzz");
    }

    bus.emit("task-manager-event", "error-message");
  });

  bus.on("fizzbuzz-event", async (fizzbuzzResult: string) => {
    bus.emit("task-manager-event", "result-validator", fizzbuzzResult);
  });

  bus.on("result-validator-event", async (resultValidatorResult: boolean) => {
    if (resultValidatorResult) {
      bus.emit("task-manager-event", "result-printer");
    }
  });

  bus.on("result-printer-event", async (resultPrinterResult: string) => {
    spinner.succeed(`🎉 FizzBuzz result: ${resultPrinterResult}`);
  });

  bus.on("error-message-event", async (errorMessage: string) => {
    spinner.fail(`🚨 Error: ${errorMessage}`);
  });

  bus.emit("user-input-received");
};

await run({ userInput });
