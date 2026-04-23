import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Circadian");
});

app.listen(port, () => {
  console.log(`Circadian App on port ${port}`);
});
