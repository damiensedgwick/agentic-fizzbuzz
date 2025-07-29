import express from "express";

const app = express();
const port = 8004;

app.get("/health", (req, res) => {
  res.json({
    message: "Coordinator agent is healthy",
  });
});

app.listen(port, () => {
  console.log(`Coordinator service listening on port ${port}...`);
});
