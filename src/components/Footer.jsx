import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5 footer">
      <div className="container">
        <div className="row">
          {/* Brand and Description */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">CRYPTODASH</h5>
            <p className="text-muted small">
              Your trusted source for real-time cryptocurrency market data. 
              Track prices, monitor trends, and stay informed about the crypto market.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="col-md-4 mb-3">
            <h6>Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/pricing" className="text-muted text-decoration-none">
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/watchlist" className="text-muted text-decoration-none">
                  WatchList
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Additional Links */}
          <div className="col-md-4 mb-3">
            <h6>Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-muted text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="row">
          <div className="col-12">
            <hr className="border-secondary" />
            <div className="text-center">
              <p className="mb-0 text-muted">
                © 2025 CryptoDash. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 