import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ title, subtitle, children }) {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <h1>CareerTrack</h1>
          <p>{user?.name || user?.email}</p>
        </div>
        <nav className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')}>
            Analytics
          </NavLink>
        </nav>
        <button className="btn btn-secondary" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>
        {children}
      </main>
    </div>
  );
}
