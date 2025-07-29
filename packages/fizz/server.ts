import express from "express";

const app = express();
const port = 8001;

app.get("/health", (req, res) => {
  res.json({
    message: "Fizz agent is healthy",
  });
});

app.listen(port, () => {
  console.log(`Fizz service listening on port ${port}...`);
});
