import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ClientHome.css";
import { Button } from "antd";
import axios from "axios";
import Footer from "../../footer";

const ClientHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/client/logout")
      .then((response) => {
        if (response.status === 200) {
          console.log("Client logged out successfully!");
          localStorage.clear();
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  return (
    <>
      <header className="App-header">
        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              <Link to="/client-home">Home</Link>
            </li>
            <li>
              <Link to="/client-new-request">New Workshop Request</Link>
            </li>
            <li>
              <Link to="/client-request-details">Request Details</Link>
            </li>
            <li>
              <Link to="/client-workshop-history">Workshop History</Link>
            </li>
            <li>
              <Button
                className="logout-button"
                type="text"
                size="large"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
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
      <Footer />
    </>
  );
};

export default ClientHome;
