import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ClientHome.css";
import { Button } from "antd";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "../../footer";

const ClientHome = () => {
  return (
    <>
      <header className="App-header">
        <NavBar />
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
      <Footer />
    </>
  );
};

export default ClientHome;
