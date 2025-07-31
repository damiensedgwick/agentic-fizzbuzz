import express, { response } from "express";
import { runAgent } from "./lib/agent";
import { tools } from "./lib/tools";

const app = express();
const port = 8004;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Coordinator agent is healthy",
  });
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

    res.json({ received: response });
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Coordinator service listening on port ${port}...`);
});
