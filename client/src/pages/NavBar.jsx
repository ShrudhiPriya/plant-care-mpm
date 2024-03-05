import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import RequireAuth from '../components/RequireAuth';

const NavBar = () => {
    const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Plant Catalog
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/catalog" className="nav-link">
              Catalog
            </Link>
          </li>
          <li className="nav-item">
            <RequireAuth>
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            </RequireAuth>
          </li>
        </ul>
      </div>
      <ul className="navbar-nav ml-auto">
        {isLoggedIn ? (
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;