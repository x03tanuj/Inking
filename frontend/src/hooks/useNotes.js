import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../api/notesApi";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      setNotes(res.data.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    try {
      const res = await createNote({ title: "Untitled", content: "" });
      setNotes([res.data.data, ...notes]);
      return res.data.data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, addNote, removeNote };
};

export default useNotes;
