import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import TestHome from "./test-home.js";
import TestSignUp from "./test-signup.js";

import AdminHome from "./components/Admin/AdminHome.js";
import AdminTrainers from "./components/Admin/AdminTrainers.js";
import AdminDashboard from "./components/Admin/AdminDashboard.js";
import AdminWorkshopRequests from "./components/Admin/AdminWorkshopRequests";
import LeaveRequests from "./components/Admin/LeaveRequests";
import EditWorkshopRequest from "./components/Admin/EditWorkshopRequest.js";

import TrainerWorkshopRequests from "./components/Trainer/TrainerWorkshopRequests.js";
import TrainerHome from "./components/Trainer/TrainerHome.js";

import NewWorkshopRequest from "./components/Client/NewWorkshopRequest.js";
import RequestSubmitted from "./components/Client/RequestSubmitted.js";
import ViewWorkshopRequest from "./components/Client/ViewWorkshopRequest.js";
import ClientHome from "./components/Client/ClientHome.js";
import ClientWorkshopHistory from "./components/Client/ClientWorkshopHistory.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="/test-signup" element={<TestSignUp />} />

          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/trainers" element={<AdminTrainers />} />
          <Route
            path="/workshop-requests"
            element={<AdminWorkshopRequests />}
          />
          <Route path="/leave-requests" element={<LeaveRequests />} />

          <Route path="/edit-request" element={<EditWorkshopRequest />} />
          <Route path="/trainer-home" element={<TrainerHome />} />
          <Route
            path="/trainer-workshop-requests"
            element={<TrainerWorkshopRequests />}
          />

          <Route path="/client-home" element={<ClientHome />} />
          <Route path="/client-new-request" element={<NewWorkshopRequest />} />
          <Route path="/client-request-submitted" element={<RequestSubmitted />} />
          <Route path="/client-request-details" element={<ViewWorkshopRequest />} />
          <Route path="/client-workshop-history" element={<ClientWorkshopHistory />} />

        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <div>Welcome to Home Page</div>;

export default App;
