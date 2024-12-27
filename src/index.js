import express from "express";
import "dotenv/config";
import appMiddleware from "./middleware/index.js";

const app = express();
const port = process.env.port || 3000;

app.use(appMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    error: null,
    message: "Welcome to unofficial api MPL Indonesia",
    data: null,
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    error: null,
    message: "Welcome to unofficial api MPL Indonesia",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
