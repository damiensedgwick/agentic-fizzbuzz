import express from "express";

const app = express();
const port = 8004;

app.get("/health", (req, res) => {
  res.json({
    message: "Number agent is healthy",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
