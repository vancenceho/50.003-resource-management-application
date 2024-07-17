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
import SignIn from './components/SignIn.js';
import AdminLoginPage from './components/Admin/AdminLogin.js';
import TrainerLoginPage from './components/Trainer/TrainerLogin.js';
import ClientLoginPage from './components/Client/ClientLogin.js';
import CreateClientAccount from './components/CreateClient.js';
import CreateAdminAccount from './components/Admin/CreateAdmin.js';
import CreateTrainerAccount from './components/Admin/CreateTrainer.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/create-client" element={<CreateClientAccount />} />
          <Route path="/create-admin" element={<CreateAdminAccount />} />
          <Route path="/create-trainer" element={<CreateTrainerAccount />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/workshop-requests" element={<AdminWorkshopRequests />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/trainer-login" element={<TrainerLoginPage />} />
          <Route path="/trainer-home" element={<TrainerHome />} />
          <Route path="/trainer-workshop-requests" element={<TrainerWorkshopRequests />} />
          <Route path="/edit-request" element={<EditWorkshopRequest />} />
          <Route path="/client-login" element={<ClientLoginPage />} />
          <Route path="/client-new-request" element={<NewWorkshopRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <div>Welcome to Home Page</div>;

export default App;
