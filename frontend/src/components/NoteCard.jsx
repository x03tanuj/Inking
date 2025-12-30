import { Link } from "react-router-dom";
import "./NoteCard.css";

const NoteCard = ({ note, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note._id);
    }
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link to={`/notes/${note._id}`} className="note-card">
      <div className="note-card-content">
        <h3>{truncateText(note.title || "Untitled", 40)}</h3>
        <p>{truncateText(note.content || "No content", 100)}</p>
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>
      <div className="note-actions">
        <button onClick={handleDelete} className="note-delete-btn">
          🗑️ Delete
        </button>
      </div>
    </Link>
  );
};

export default NoteCard;
