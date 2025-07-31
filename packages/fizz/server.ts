import express from "express";

const app = express();
const port = 8001;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Fizz agent is healthy",
  });
});

app.post("/check", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ error: "Number is required" });
  }

  console.log(`🔵 Fizz agent received message from coordinator: processing number ${number}`);

  // Check if number is divisible by 3
  if (number % 3 === 0) {
    console.log(`✅ Fizz agent: ${number} is divisible by 3, returning "Fizz"`);
    res.json({ result: "Fizz" });
  } else {
    console.log(`❌ Fizz agent: ${number} is not divisible by 3, returning null`);
    res.json({ result: null });
  }
});

app.listen(port, () => {
  console.log(`Fizz service listening on port ${port}...`);
});
