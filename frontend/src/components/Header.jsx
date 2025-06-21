"use client"

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header({ user, onLogout }) {
  const location = useLocation();

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🏦 BankFYP</h1>
        </Link>
        
        <nav className="main-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Us
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
          <Link to="/faqs" className={location.pathname === '/faqs' ? 'active' : ''}>
            FAQs
          </Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user.name}</span>
              <Link 
                to="/dashboard" 
                className="btn btn-secondary"
              >
                Dashboard
              </Link>
              <button onClick={onLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;