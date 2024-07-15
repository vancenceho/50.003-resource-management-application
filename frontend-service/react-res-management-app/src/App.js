import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminWorkshopRequests from './components/Admin/AdminWorkshopRequests';
import LeaveRequests from './components/Admin/LeaveRequests';
import './App.css';
import TrainerWorkshopRequests from './components/Trainer/TrainerWorkshopRequests.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <ul className="navbar-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/workshop-requests">Workshop Requests</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/leave-requests">Leave Requests</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workshop-requests" element={<AdminWorkshopRequests />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/trainer-workshop-requests" element={<TrainerWorkshopRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <div>Welcome to Home Page</div>;

export default App;
