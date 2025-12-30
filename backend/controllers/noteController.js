import asyncHandler from "../middleware/asyncHandler.js";
import Note from "../models/Notes.js";

// Create Note
export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const note = await Note.create({
    title,
    content: content || "",
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    data: note,
  });
});

export const allNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

// Delete route
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

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
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
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
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
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
