import express, { response } from "express";
import { runAgent } from "./lib/agent";
import { tools } from "./lib/tools";
import { resetDatabase } from "./lib/memory";

const app = express();
const port = 8004;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Coordinator agent is healthy",
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

app.post("/process", async (req, res) => {
  const { task, number } = req.body;

  if (!task || !number) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const response = await runAgent({
      message: { task, number },
      tools,
    });

    console.info(`
      ${response[response.length - 1]?.content}
    `);

    res.json({
      message: response[response.length - 1]?.content,
    });
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Coordinator service listening on port ${port}...`);
});
