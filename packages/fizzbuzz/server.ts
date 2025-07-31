import express from "express";
import { runAgent } from "./lib/agent";
import { tools } from "./lib/tools";
import { resetDatabase } from "./lib/memory";

const app = express();
const port = 8003;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "FizzBuzz agent is healthy",
  });
});

app.post("/reset", async (req, res) => {
  try {
    await resetDatabase();

    res.json({
      message: "Database reset successfully",
    });
  } catch (error) {
    console.error("🚀 ~ reset error:", error);
    res.status(500).json({ error: "Failed to reset database" });
  }
});

app.post("/check", async (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ error: "Number is required" });
  }

  console.log(
    `🟢 FizzBuzz agent received message from coordinator: processing number ${number}`
  );

  try {
    const response = await runAgent({
      message: { number },
      tools,
    });

    const lastMessage = response[response.length - 1];
    const result = lastMessage?.content;

    console.log(`✅ FizzBuzz agent: ${number} processed, result: ${result}`);

    res.json({
      result: result === "FizzBuzz" ? "FizzBuzz" : null,
    });
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`FizzBuzz service listening on port ${port}...`);
});
