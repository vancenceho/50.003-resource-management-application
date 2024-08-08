<<<<<<< HEAD
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ClientHome.css";
import { Button } from "antd";
import axios from "axios";
import Footer from "../../footer";
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './ClientHome.css';
>>>>>>> 7e2578a9926dee7f291da5e54f6a86e178260696

const ClientHome = () => {
  return (
    <>
    
    <header className="App-header">
          <nav className="navbar">
            <ul className="navbar-list">
              <li><Link to="/client-home">Home</Link></li>
              <li><Link to="/client-new-request">New Workshop Request</Link></li>
              <li><Link to="/client-request-details">Request Details</Link></li>
              <li><Link to="/client-workshop-history">Workshop History</Link></li>
            </ul>
          </nav>
        </header>

    <div className="home-container">

      <main className="main-content">
        <h1>Requests & Resource Management</h1>
        <div className="cards-container">
          <div className="card">
            <img src="/images/admin_home_1.jpg" alt="New Request" />
            <h2>New Workshop Request</h2>
            <a href="/client-new-request">Create Request</a>
          </div>
          <div className="card">
            <img src="/images/admin_home_2.jpg" alt="View Request" />
            <h2>View Current Request</h2>
            <a href="/client-request-details">View Request</a>
          </div>
          <div className="card">
            <img src="/images/admin_home_3.jpg" alt="Workshop History" />
            <h2>Workshop History</h2>
            <a href="/client-workshop-history">View All Workshop Requests</a>
          </div>
        </div>
      </main>
    </div>
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-logo">
        <img src="/Users/hardikshah/50.003-resource-management-application/frontend-service/react-res-management-app/public/logo192.png" alt="Logo" />
      </div>
<<<<<<< HEAD
      <Footer />
=======
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
>>>>>>> 7e2578a9926dee7f291da5e54f6a86e178260696
    </>
  );
};

export default ClientHome;
