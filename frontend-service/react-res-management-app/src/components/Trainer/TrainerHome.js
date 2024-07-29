import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './TrainerHome.css';

const TrainerHome = () => {
  return (
    <>
    
    <header className="App-header">
          <nav className="navbar">
            <ul className="navbar-list">
              <li><Link to="/trainer-home">Home</Link></li>
              <li><Link to="/trainer-workshop-requests">Workshop Requests</Link></li>
            </ul>
          </nav>
        </header>

    <div className="home-container">

      <main className="main-content">
        <h1>Requests & Resource Management</h1>
        <div className="cards-container">
          <div className="card">
            <img src="/images/admin_home_3.jpg" alt="Workshop Requests" />
            <h2>Workshop Requests</h2>
            <a href="/trainer-workshop-requests">View Current Workshop Requests</a>
          </div>
        </div>
      </main>
    </div>
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-logo">
        <img src="/Users/hardikshah/50.003-resource-management-application/frontend-service/react-res-management-app/public/logo192.png" alt="Logo" />
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

export default TrainerHome;