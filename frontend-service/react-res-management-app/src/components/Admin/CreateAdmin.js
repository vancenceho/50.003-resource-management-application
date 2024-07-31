import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './CreateAdmin.css';
import dellLogo from './dell-logo.png';

const CreateAdminAccount = () => {
  return (
      <>
        <header className="App-header">
          <nav className="navbar">
            <ul className="navbar-list">
              <li><Link to="/admin-home">Home</Link></li>
              <li><Link to="/workshop-requests">Workshop Requests</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/leave-requests">Leave Requests</Link></li>
              <li><Link to="/create-admin">New Admin</Link></li>
              <li><Link to="/create-trainer">New Trainer</Link></li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <h2 className="main-title">New Admin Account</h2>
          <div className="form-container">
            <form className="admin-form">
              <label>
                Username:
                <input type="text" name="username" required />
              </label>
              <label>
                First Name:
                <input type="text" name="firstName" required />
              </label>
              <label>
                Last Name:
                <input type="text" name="lastName" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Password:
                <input type="password" name="password" required />
              </label>
              <button type="submit" className="confirm-button">Confirm</button>
            </form>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/path/to/logo192.png" alt="Logo" />
            </div>
            <div className="footer-details">
              <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
              <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
              <p>1672 345 0987</p>
              <p>1672 345 0987</p>
              <p>info@company.io</p>
            </div>
            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2023 Company. All rights reserved.</p>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Settings</a>
          </div>
        </footer>
      </>
  );
};

export default CreateAdminAccount;
