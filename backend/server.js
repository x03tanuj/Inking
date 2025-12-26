import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

// Middleware
app.use(express.json());

const port = process.env.PORT;

import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
await connectDB();

app.get("/", (req, res) => {
  res.send("Server is working on port " + port);
});

// Routes
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
