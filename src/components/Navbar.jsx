import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

// Add Material Icons font import for icon usage

const Navbar = () => {
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          <span className="crypto-white">CRYPTO</span>DASH
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                to="/"
              >
                <span className="nav-link-flex"><span className="material-icons">home</span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
                to="/pricing"
              >
                <span className="nav-link-flex"><span className="material-icons">attach_money</span>Pricing</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/watchlist') ? 'active' : ''}`}
                to="/watchlist"
              >
                <span className="nav-link-flex"><span className="material-icons">star</span>WatchList</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                to="/about"
              >
                <span className="nav-link-flex"><span className="material-icons">info</span>About Us</span>
              </Link>
            </li>
          </ul>

          {/* Right Side Controls */}
          <div className="navbar-nav ms-auto">
            {/* Currency Selector */}
            <div className="nav-item dropdown me-3">
              <select
                className="form-select form-select-sm bg-dark text-light border-secondary navbar-currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
              </select>
            </div>

            {/* Sign Up Button */}
            <Link className="glow-on-hover"  to="/signup">
              <span className="material-icons">person_add</span>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 