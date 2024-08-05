import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LeaveRequests.css';
import moment from 'moment';

const trainerMapping = {
  "668d5ba4a5f8eca9ff47283e": "Trainer 1",
  "668d5ba4a5f8eca9ff47284e": "Trainer 2",
  "668d5ba4a5f8eca9ff47285e": "Trainer 3",
  "668d5ba4a5f8eca9ff47286e": "Trainer 4",
  "668d5ba4a5f8eca9ff47287e": "Trainer 5",
  "668d5ba4a5f8eca9ff47288e": "Trainer 6"
};

const LeaveRequests = () => {
  const [filters, setFilters] = useState({
    date: null,
    trainer: '',
    status: '',
  });
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/leaveRequest', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const mappedData = data.map(leave => ({
          ...leave,
          trainerName: trainerMapping[leave.trainer] || leave.trainer
        }));
        setLeaveData(mappedData);
      } catch (error) {
        console.error('Failed to fetch leave data:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      date: null,
      trainer: '',
      status: '',
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/leaveRequest/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedLeave = await response.json();
      setLeaveData(prevData => prevData.map(leave => leave._id === id ? { ...leave, status: newStatus } : leave));
    } catch (error) {
      console.error('Failed to update leave status:', error);
    }
  };

  const filteredData = leaveData.filter((leave) => {
    return (
      (!filters.date || moment(leave.startDate).isSame(filters.date, 'day')) &&
      (!filters.trainer || leave.trainerName.toLowerCase().includes(filters.trainer.toLowerCase())) &&
      (!filters.status || leave.status.toLowerCase() === filters.status.toLowerCase())
    );
  });

  return (
    <>
      <header className="App-header">
        <nav className="navbar">
          <ul className="navbar-list">
            <li><a href="/admin-home">Home</a></li>
            <li><a href="/workshop-requests">Workshop Requests</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/leave-requests">Leave Requests</a></li>
          </ul>
        </nav>
      </header>
      
      <div className="leave-requests">
        <div className="content">
          <h1>Leave Requests</h1>
          <div className="filters">
            <button>Filter By</button>
            <DatePicker
              selected={filters.date}
              onChange={(date) => handleFilterChange('date', date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
            />
            <label htmlFor="trainer">Trainer</label>
            <select name="trainer" id="trainer" value={filters.trainer} onChange={(e) => handleFilterChange('trainer', e.target.value)}>
              <option value="">All Trainers</option>
              <option value="Trainer 1">Trainer 1</option>
              <option value="Trainer 2">Trainer 2</option>
              <option value="Trainer 3">Trainer 3</option>
              <option value="Trainer 4">Trainer 4</option>
              <option value="Trainer 5">Trainer 5</option>
              <option value="Trainer 6">Trainer 6</option>
            </select>
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button onClick={handleResetFilters}>Reset Filter</button>
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
              {filteredData.map((leave) => (
                <tr key={leave._id}>
                  <td>{leave._id.slice(0, 8)}...</td>
                  <td>{leave.trainerName}</td>
                  <td>{leave.reason}</td>
                  <td>{moment(leave.startDate).format('YYYY-MM-DD')}</td>
                  <td>
                    <select
                      value={leave.status}
                      onChange={(e) => handleStatusChange(leave._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-details">
            <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
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
}

export default LeaveRequests;
