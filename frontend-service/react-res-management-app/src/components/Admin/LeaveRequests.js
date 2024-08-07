import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./LeaveRequests.css";
import NavBar from "./NavBar";
import Footer from "../../footer";

const LeaveRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      trainer: "Trainer 1",
      reason: "Personal Leave",
      date: new Date("2024-07-21"),
      status: "Pending",
    },
    {
      id: 2,
      trainer: "Trainer 2",
      reason: "Medical Leave",
      date: new Date("2024-07-19"),
      status: "Accepted",
    },
    {
      id: 3,
      trainer: "Trainer 3",
      reason: "Family Emergency",
      date: new Date("2024-07-14"),
      status: "Pending",
    },
    {
      id: 4,
      trainer: "Trainer 4",
      reason: "Vacation",
      date: new Date("2024-09-8"),
      status: "Rejected",
    },
    {
      id: 5,
      trainer: "Trainer 5",
      reason: "Workshop Preparation",
      date: new Date("2024-08-16"),
      status: "Accepted",
    },
    // Add more requests as needed
  ]);
  const [filterDate, setFilterDate] = useState(null);
  const [filterTrainer, setFilterTrainer] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const handleResetFilters = () => {
    setFilterDate(null);
    setFilterTrainer("");
    setFilterStatus("");
  };

  const filteredRequests = requests.filter((request) => {
    const matchesDate = filterDate
      ? request.date.toDateString() === filterDate.toDateString()
      : true;
    const matchesTrainer = filterTrainer
      ? request.trainer === filterTrainer
      : true;
    const matchesStatus = filterStatus ? request.status === filterStatus : true;
    return matchesDate && matchesTrainer && matchesStatus;
  });

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>

      <div className="leave-requests">
        <h1>Leave Requests</h1>
        <div className="filters">
          <button className="filter-button">Filter By</button>
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            placeholderText="Select Date"
            className="filter-input"
          />
          <select
            value={filterTrainer}
            onChange={(e) => setFilterTrainer(e.target.value)}
            className="filter-input"
          >
            <option value="">All Trainers</option>
            <option value="Trainer 1">Trainer 1</option>
            <option value="Trainer 2">Trainer 2</option>
            <option value="Trainer 3">Trainer 3</option>
            <option value="Trainer 4">Trainer 4</option>
            <option value="Trainer 5">Trainer 5</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-input"
          >
            <option value="">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={handleResetFilters} className="filter-button">
            Reset Filter
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Trainer Name</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.trainer}</td>
                <td>{request.reason}</td>
                <td>{request.date.toDateString()}</td>
                <td>
                  <select
                    value={request.status === "Pending" ? "" : request.status}
                    onChange={(e) =>
                      handleStatusChange(
                        request.id,
                        e.target.value || "Pending"
                      )
                    }
                  >
                    <option value="">Pending</option>
                    <option value="Accepted">Accept</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default LeaveRequests;
