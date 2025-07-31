import express from "express";

const app = express();
const port = 8003;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "FizzBuzz agent is healthy",
  });
});

app.post("/check", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ error: "Number is required" });
  }

  console.log(`🟢 FizzBuzz agent received message from coordinator: processing number ${number}`);

  // Check if number is divisible by both 3 and 5
  if (number % 3 === 0 && number % 5 === 0) {
    console.log(`✅ FizzBuzz agent: ${number} is divisible by both 3 and 5, returning "FizzBuzz"`);
    res.json({ result: "FizzBuzz" });
  } else {
    console.log(`❌ FizzBuzz agent: ${number} is not divisible by both 3 and 5, returning null`);
    res.json({ result: null });
  }
});

app.listen(port, () => {
  console.log(`FizzBuzz service listening on port ${port}...`);
});
