import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

const port = process.env.PORT;

import { connectDB } from "./config/db.js";
await connectDB();

app.get("/", (req, res) => {
  res.send("Server is working on port " + port);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
