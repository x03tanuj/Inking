import asyncHandler from "../middlewares/asyncHandler.js";
import Note from "../models/Notes.js";

// Create Note
export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  const note = await Note.create({
    title,
    content,
  });
  res.status(201).json({
    success: true,
    data: note,
  });
});

export const allNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

// Delete route
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

export const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.status(200).json({
    success: true,
    data: note,
  });
});
