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
      <Footer />
    </>
  );
};

export default AdminHome;
