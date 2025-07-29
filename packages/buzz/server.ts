import express from "express";

const app = express();
const port = 8002;

app.get("/health", (req, res) => {
  res.json({
    message: "Buzz agent is healthy",
  });
});

app.listen(port, () => {
  console.log(`Buzz service listening on port ${port}...`);
});
