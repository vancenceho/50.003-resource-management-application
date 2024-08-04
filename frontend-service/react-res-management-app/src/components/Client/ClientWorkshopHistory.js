import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './ClientWorkshopHistory.css';

const localizer = momentLocalizer(moment);

function ClientWorkshopHistory() {
  const [view, setView] = useState('list');
  const [filters, setFilters] = useState({
    date: null,
    type: '',
    status: '',
  });
  const [workshopData, setWorkshopData] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const navigate = useNavigate();
  
  // Placeholder client ID
  const clientId = '60b8d295f1f647001f647f1a';

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch('http://localhost:3000/workshop', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setWorkshopData(data);
      } catch (error) {
        console.error('Failed to fetch workshop data:', error);
      }
    };

    fetchWorkshops();
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
      type: '',
      status: '',
    });
  };

  const filteredData = workshopData.filter((workshop) => {
    return (
      workshop.client === clientId &&
      (!filters.date || moment(workshop.startDate).isSame(filters.date, 'day')) &&
      (!filters.type || workshop.type.toLowerCase() === filters.type.toLowerCase()) &&
      (!filters.status || workshop.status.toLowerCase() === filters.status.toLowerCase())
    );
  });

  const events = filteredData.map((workshop, index) => ({
    id: index,
    title: workshop.name,
    start: new Date(workshop.startDate),
    end: new Date(workshop.endDate),
  }));

  const handleSelectEvent = (event) => {
    const workshop = filteredData.find(w => w.name === event.title);
    setSelectedWorkshop(workshop);
  };

  const handleWorkshopClick = (workshopId) => {
    navigate(`//localhost:3001/client-request-details/${workshopId}`);
  };

  return (
    <>
      <header className="App-header">
        <nav className="navbar">
          <ul className="navbar-list">
            <li><Link to="/client-home">Home</Link></li>
            <li><Link to="/client-new-request">New Workshop Request</Link></li>
            <li><Link to="/client-request-details">Request Details</Link></li>
            <li><Link to="/client-workshop-history">Workshop History</Link></li>
          </ul>
        </nav>
      </header>

      <div className="admin-workshop-requests">
        <div className="content">
          <h1>Workshop Request History</h1>
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
              <option value="Business Value Discover">Business Value Discover</option>
              <option value="AI Platform">AI Platform</option>
              <option value="Infrastructure and Demo">Infrastructure and Demo</option>
            </select>
            <select name="status" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
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
                  <tr key={workshop._id || workshop.tempId} onClick={() => handleWorkshopClick(workshop._id)}>
                    <td>{workshop._id ? workshop._id.slice(0, 8) : 'N/A'}...</td>
                    <td>{workshop.name}</td>
                    <td>{workshop.location}</td>
                    <td>{moment(workshop.startDate).format('YYYY-MM-DD')}</td>
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
                  <p><strong>Address:</strong> {selectedWorkshop.location}</p>
                  <p><strong>Date:</strong> {moment(selectedWorkshop.startDate).format('YYYY-MM-DD')}</p>
                  <p><strong>Type:</strong> {selectedWorkshop.type}</p>
                  <p><strong>Status:</strong> {selectedWorkshop.status}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo192.png" alt="Logo" />
          </div>
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

export default ClientWorkshopHistory;
