import express from "express";

const app = express();
const port = 8002;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Buzz agent is healthy",
  });
});

app.post("/check", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ error: "Number is required" });
  }

  console.log(`🟡 Buzz agent received message from coordinator: processing number ${number}`);

  // Check if number is divisible by 5
  if (number % 5 === 0) {
    console.log(`✅ Buzz agent: ${number} is divisible by 5, returning "Buzz"`);
    res.json({ result: "Buzz" });
  } else {
    console.log(`❌ Buzz agent: ${number} is not divisible by 5, returning null`);
    res.json({ result: null });
  }
});

app.listen(port, () => {
  console.log(`Buzz service listening on port ${port}...`);
});
