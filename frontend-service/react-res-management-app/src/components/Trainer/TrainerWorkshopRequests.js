import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TrainerWorkshopRequests.css';

const localizer = momentLocalizer(moment);

function TrainerWorkshopRequests() {
  const [view, setView] = useState('list'); // State to toggle between views
  const [filters, setFilters] = useState({
    date: null,
    type: '',
    status: '',
  });
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const workshopData = [
    { id: '00001', name: 'Workshop 1', address: '089 Kutch Green Apt. 448', date: '2024-07-11', type: 'Type A', status: 'Accepted' },
    { id: '00002', name: 'Workshop 2', address: '979 Immanuel Ferry Suite 526', date: '2024-07-12', type: 'Type B', status: 'Accepted' },
    { id: '00003', name: 'Workshop 3', address: '8587 Frida Ports', date: '2024-07-13', type: 'Type C', status: 'Completed' },
    { id: '00004', name: 'Workshop 4', address: '768 Destiny Lake Suite 600', date: '2024-07-14', type: 'Type A', status: 'Accepted' },
    { id: '00005', name: 'Workshop 5', address: '042 Mylene Throughway', date: '2024-07-15', type: 'Type B', status: 'Accepted' },
    { id: '00006', name: 'Workshop 6', address: '543 Weinman Mountain', date: '2024-07-16', type: 'Type C', status: 'Completed' },
  ];

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      date: null,
      type: '',
      status: '',
    });
  };

  const filteredData = workshopData.filter((workshop) => {
    return (
      (!filters.date || moment(workshop.date).isSame(filters.date, 'day')) &&
      (!filters.type || workshop.type === filters.type) &&
      (!filters.status || workshop.status === filters.status)
    );
  });

  const events = filteredData.map((workshop, index) => ({
    id: index,
    title: workshop.name,
    start: new Date(workshop.date),
    end: new Date(workshop.date),
  }));

  const handleSelectEvent = (event) => {
    const workshop = filteredData.find(w => w.name === event.title);
    setSelectedWorkshop(workshop);
  };

  return (
    <>
    <header className="App-header">
          <nav className="navbar">
            <ul className="navbar-list">
              <li><Link to="/trainer-home">Home</Link></li>
              <li><Link to="/trainer-workshop-requests">Workshop Requests</Link></li>
            </ul>
          </nav>
        </header>
    <div className="trainer-workshop-requests">
      <div className="content">
        <h1>Workshop Requests</h1>
        <div className="tabs">
          <button className={`tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List View</button>
          <button className={`tab ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')}>Calendar View</button>
        </div>
        <div className="filters">
          <button>Filter By</button>
          <DatePicker
            selected={filters.date}
            onChange={(date) => handleFilterChange('date', date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
          />
          <select name="type" value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
            <option value="">All Types</option>
            <option value="Type A">Type A</option>
            <option value="Type B">Type B</option>
            <option value="Type C">Type C</option>
          </select>
          <select name="status" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleResetFilters}>Reset Filter</button>
        </div>
        {view === 'list' ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Workshop Name</th>
                <th>Address</th>
                <th>Date</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((workshop) => (
                <tr key={workshop.id}>
                  <td>{workshop.id}</td>
                  <td>{workshop.name}</td>
                  <td>{workshop.address}</td>
                  <td>{workshop.date}</td>
                  <td>{workshop.type}</td>
                  <td>{workshop.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleSelectEvent}
            />
            {selectedWorkshop && (
              <div className="workshop-details">
                <h2>{selectedWorkshop.name}</h2>
                <p><strong>Address:</strong> {selectedWorkshop.address}</p>
                <p><strong>Date:</strong> {selectedWorkshop.date}</p>
                <p><strong>Type:</strong> {selectedWorkshop.type}</p>
                <p><strong>Status:</strong> {selectedWorkshop.status}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/Users/hardikshah/50.003-resource-management-application/frontend-service/react-res-management-app/public/logo192.png" alt="Logo" />
          </div>
          <div className="footer-details">
            <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
            <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
            <p>1672 345 0987</p>
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
    </div>
    </>
  );
}

export default TrainerWorkshopRequests;
