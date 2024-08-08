<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "./AdminHome.css";

import NavBar from "./NavBar";
import Footer from "../../footer";

const AdminHome = () => {
  useEffect(() => {
    document.title = "Dell Resources | Home";
  }, []);

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
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
>>>>>>> 7e2578a9926dee7f291da5e54f6a86e178260696

    <div className="home-container">

      <main className="main-content">
        <h1>Requests & Resource Management</h1>
        <div className="cards-container">
          <div className="card">
            <img src="/images/admin_home_1.jpg" alt="Dashboard" />
            <h2>Dashboard</h2>
            <a href="/dashboard">View Dashboard</a>
          </div>
          <div className="card">
            <img src="/images/admin_home_2.jpg" alt="Leave Requests" />
            <h2>Leave Requests</h2>
            <a href="/leave-requests">View Current Leave Requests</a>
          </div>
          <div className="card">
            <img src="/images/admin_home_3.jpg" alt="Workshop Requests" />
            <h2>Workshop Requests</h2>
            <a href="/workshop-requests">View Current Workshop Requests</a>
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

export default AdminHome;