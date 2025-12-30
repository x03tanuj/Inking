import express from "express";
import validateObjectId from "../middleware/validateObjectId.js";
import {
  createNote,
  allNotes,
  deleteNote,
  updateNote,
  getNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(protect); 

router.post("/", createNote);
router.get("/", allNotes);
router.get("/:id", validateObjectId, getNote);
router.put("/:id", validateObjectId, updateNote);
router.delete("/:id", validateObjectId, deleteNote);

export default router;
