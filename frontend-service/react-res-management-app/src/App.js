import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminWorkshopRequests from './components/Admin/AdminWorkshopRequests';
import LeaveRequests from './components/Admin/LeaveRequests';
import './App.css';
import TrainerWorkshopRequests from './components/Trainer/TrainerWorkshopRequests.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import EditWorkshopRequest from './components/Admin/EditWorkshopRequest.js';
import AdminHome from './components/Admin/AdminHome.js';
import NewWorkshopRequest from './components/Client/NewWorkshopRequest.js';
import TrainerHome from './components/Trainer/TrainerHome.js';
import LoginPage from './components/Login.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/workshop-requests" element={<AdminWorkshopRequests />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/trainer-home" element={<TrainerHome />} />
          <Route path="/trainer-workshop-requests" element={<TrainerWorkshopRequests />} />
          <Route path="/edit-request" element={<EditWorkshopRequest />} />
          <Route path="/client-new-request" element={<NewWorkshopRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <div>Welcome to Home Page</div>;

export default App;
