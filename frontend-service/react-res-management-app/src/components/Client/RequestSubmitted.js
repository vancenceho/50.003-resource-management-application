import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './RequestSubmitted.css'; // Include this file for the CSS styles
import submitsuccess from './SubmitSuccessful.png';

const RequestSubmitted = ({ handleBackToHome }) => {
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

        <div className="container">
            <div className="main-container">
                <section id="confirmation-message">
                    <h1>Request Submitted Successfully</h1>
                    <div style={{ textAlign: 'center' }}>
                        <img src={submitsuccess} alt="Confirmation Image" />
                    </div>
                </section>
            </div>
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

export default RequestSubmitted;
