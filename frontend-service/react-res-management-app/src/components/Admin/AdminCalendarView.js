import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AdminCalendarView.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminWorkshopRequests from './AdminWorkshopRequests';
import LeaveRequests from './LeaveRequests';
import TrainerWorkshopRequests from '../Trainer/TrainerWorkshopRequests.js';
import AdminDashboard from './AdminDashboard.js';
import EditWorkshopRequest from './EditWorkshopRequest.js';
import AdminHome from './AdminHome.js';
import NewWorkshopRequest from '../Client/NewWorkshopRequest.js';


const localizer = momentLocalizer(moment);

const AdminCalendarView = () => {
  const [events] = useState([
    {
      title: 'Workshop 1',
      start: new Date(2019, 1, 14), // 14 Feb 2019
      end: new Date(2019, 1, 14),
      type: 'Type A',
      status: 'Accepted',
    },
    {
      title: 'Workshop 2',
      start: new Date(2019, 1, 14),
      end: new Date(2019, 1, 14),
      type: 'Type B',
      status: 'Pending',
    },
    // Add more events as needed
  ]);

  return (
  <>
    <header className="App-header">
          <nav className="navbar">
            <ul className="navbar-list">
              <li><Link to="/admin-home">Home</Link></li>
              <li><Link to="/workshop-requests">Workshop Requests</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/leave-requests">Leave Requests</Link></li>
              <li><Link to="/create-admin">New Admin</Link></li>
              <li><Link to="/create-trainer">New Trainer</Link></li>
            </ul>
          </nav>
    </header>
    <div className="admin-calendar-view">
      <h1>Workshop Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
    </>
  );
};

export default AdminCalendarView;
