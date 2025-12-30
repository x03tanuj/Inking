import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {user?.name}! 👋</h1>
          <p className="welcome-subtitle">
            Your personal note-taking workspace
          </p>
        </div>

        <div className="features-grid">
          <Link to="/notes" className="feature-card highlight">
            <div className="feature-header">
              <span className="feature-icon">📝</span>
              <h3>My Notes</h3>
            </div>
            <p>Create, edit, and manage all your notes</p>
            <span className="feature-arrow">→</span>
          </Link>

          <div className="feature-card">
            <div className="feature-header">
              <span className="feature-icon">🔒</span>
              <h3>Secure & Private</h3>
            </div>
            <p>Your notes are encrypted and only visible to you</p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <span className="feature-icon">⚡</span>
              <h3>Auto-Save</h3>
            </div>
            <p>Your changes are automatically saved as you type</p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <span className="feature-icon">📱</span>
              <h3>Accessible</h3>
            </div>
            <p>Access your notes from anywhere, anytime</p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat">
            <div className="stat-value">∞</div>
            <div className="stat-label">Unlimited Notes</div>
          </div>
          <div className="stat">
            <div className="stat-value">✓</div>
            <div className="stat-label">Always Synced</div>
          </div>
          <div className="stat">
            <div className="stat-value">🚀</div>
            <div className="stat-label">Lightning Fast</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
