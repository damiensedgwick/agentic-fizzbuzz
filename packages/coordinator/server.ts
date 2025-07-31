import express from "express";

const app = express();
const port = 8004;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Coordinator agent is healthy",
  });
});

app.post("/process", (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`Coordinator service listening on port ${port}...`);
});
