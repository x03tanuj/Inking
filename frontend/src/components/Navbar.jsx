import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isNotesPage = location.pathname === "/notes";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">📝</span>
          <span className="brand-name">NotesApp</span>
        </div>

        {isNotesPage && <div className="navbar-title">My Notes</div>}

        <div className="navbar-user">
          <span className="user-greeting">Hi, {user.name}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
