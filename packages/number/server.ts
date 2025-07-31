import express from "express";

const app = express();
const port = 8005;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Number agent is healthy",
  });
});

app.post("/check", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ error: "Number is required" });
  }

  console.log(`🔴 Number agent received message from coordinator: processing number ${number}`);

  // For numbers not divisible by 3 or 5, return the number as string
  console.log(`✅ Number agent: ${number} is not divisible by 3 or 5, returning "${number}"`);
  res.json({ result: number.toString() });
});

app.listen(port, () => {
  console.log(`Number service listening on port ${port}...`);
});
