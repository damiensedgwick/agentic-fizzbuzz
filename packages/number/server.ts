import express from "express";

const app = express();
const port = 8005;

app.get("/health", (req, res) => {
  res.json({
    message: "Number agent is healthy",
  });
});

app.listen(port, () => {
  console.log(`Number service listening on port ${port}...`);
});
