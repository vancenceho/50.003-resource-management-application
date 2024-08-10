import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./TrainerHome.css";
import NavBar from "./NavBar";
import Footer from "../../footer.js";

const TrainerHome = () => {
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
              <img src="/images/admin_home_3.jpg" alt="Workshop Requests" />
              <h2>Workshop Requests</h2>
              <a href="/trainer-workshop-requests">
                View Current Workshop Requests
              </a>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default TrainerHome;
