import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

//=== APP HEADER ===
// Top navigation bar shown on all pages, uses Bootstrap
function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  // Handles logout and redirects uer to login page
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark app-navbar px-3">
      {/* Brand/App title */}
      <Link className="navbar-brand app-brand" to="/">
        Event Planner
      </Link>

      {/* Toggle button (Bootstrap collapse) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible navigation section */}
      <div className="collapse navbar-collapse" id="navMenu">
        {/* Left side navigation links */}
        {/* Shows Dashboard, Add event, and Help links */}
        <ul className="navbar-nav me-auto">
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Event
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right side auth controls */}
        {/* Shows Username and Logout button or Login/Register buttons */}
        <ul className="navbar-nav ms-auto align-items-lg-center">
          {isLoggedIn ? (
            <>
              <li className="nav-item me-3">
                <span className="navbar-text app-user">{user?.name}</span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/help">
                  Help
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

