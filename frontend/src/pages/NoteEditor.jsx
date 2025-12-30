import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote } from "../api/notesApi";
import "./NoteEditor.css";

const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await getNoteById(id);
        setNote(res.data.data);
        setError("");
      } catch (err) {
        setError("Failed to load note");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const updated = { ...note, [e.target.name]: e.target.value };
    setNote(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      await updateNote(id, {
        title: note.title || "Untitled",
        content: note.content,
      });
      // Redirect to notes list after saving
      setTimeout(() => navigate("/notes"), 500);
    } catch (err) {
      setError("Failed to save note");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate("/notes");
  };

  if (loading) return <div className="editor-loading">Loading note...</div>;

  return (
    <div className="note-editor">
      <div className="editor-header">
        <button className="btn-back" onClick={handleBack}>
          ← Back
        </button>
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {error && <div className="editor-error">{error}</div>}

      <input
        className="editor-title"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Note Title..."
      />

      <textarea
        className="editor-content"
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Write your note here..."
      />
    </div>
  );
};

export default NoteEditor;
