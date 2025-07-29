import express from "express";

const app = express();
const port = 8003;

app.get("/health", (req, res) => {
  res.json({
    message: "FizzBuzz agent is healthy",
  });
});

app.listen(port, () => {
  console.log(`FizzBuzz service listening on port ${port}...`);
});
