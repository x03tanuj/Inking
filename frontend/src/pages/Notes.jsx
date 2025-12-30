import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import "./Notes.css";

const Notes = () => {
  const { notes, loading, addNote, removeNote } = useNotes();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleAddNote = async () => {
    try {
      setCreating(true);
      setError("");
      const newNote = await addNote();
      // Navigate directly to the editor for the new note
      navigate(`/notes/${newNote._id}`);
    } catch (err) {
      setError("Failed to create note");
      console.error(err);
      setCreating(false);
    }
  };

  if (loading)
    return <div className="notes-loading">Loading your notes...</div>;

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>My Notes</h1>
        <button
          className="btn-new-note"
          onClick={handleAddNote}
          disabled={creating}
        >
          {creating ? "Creating..." : "+ New Note"}
        </button>
      </div>

      {error && <div className="notes-error">{error}</div>}

      <div className="notes-content">
        {notes.length === 0 ? (
          <div className="notes-empty">
            <p>No notes yet</p>
            <p>Click "New Note" to create your first note!</p>
          </div>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={removeNote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
