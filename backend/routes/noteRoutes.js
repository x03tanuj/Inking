import express from "express";
import { createNote, allNotes } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", allNotes);

export default router;
