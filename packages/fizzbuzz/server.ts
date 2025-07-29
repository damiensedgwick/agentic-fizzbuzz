import express from "express";

const app = express();
const port = 8003;

app.get("/health", (req, res) => {
  res.json({
    message: "Fizzbuzz agent is healthy",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
