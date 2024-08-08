import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./ClientWorkshopHistory.css";
import NavBar from "./NavBar";
import Footer from "../../footer";

const localizer = momentLocalizer(moment);

function ClientWorkshopHistory() {
  const [view, setView] = useState("list"); // State to toggle between views
  const [filters, setFilters] = useState({
    date: null,
    type: "",
    status: "",
  });
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const workshopData = [
    {
      id: "00001",
      name: "Workshop 1",
      address: "089 Kutch Green Apt. 448",
      date: "2024-07-11",
      type: "Type A",
      status: "Accepted",
    },
    {
      id: "00002",
      name: "Workshop 2",
      address: "979 Immanuel Ferry Suite 526",
      date: "2024-07-12",
      type: "Type B",
      status: "Pending",
    },
    {
      id: "00003",
      name: "Workshop 3",
      address: "8587 Frida Ports",
      date: "2024-07-13",
      type: "Type C",
      status: "Rejected",
    },
    {
      id: "00004",
      name: "Workshop 4",
      address: "768 Destiny Lake Suite 600",
      date: "2024-07-14",
      type: "Type A",
      status: "Accepted",
    },
    {
      id: "00005",
      name: "Workshop 5",
      address: "042 Mylene Throughway",
      date: "2024-07-15",
      type: "Type B",
      status: "Pending",
    },
    {
      id: "00006",
      name: "Workshop 6",
      address: "543 Weinman Mountain",
      date: "2024-07-16",
      type: "Type C",
      status: "Completed",
    },
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
      type: "",
      status: "",
    });
  };

  const filteredData = workshopData.filter((workshop) => {
    return (
      (!filters.date || moment(workshop.date).isSame(filters.date, "day")) &&
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
    const workshop = filteredData.find((w) => w.name === event.title);
    setSelectedWorkshop(workshop);
  };

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>

      <div className="admin-workshop-requests">
        <div className="content">
          <h1>Workshop Request History</h1>
          <div className="filters">
            <button>Filter By</button>
            <DatePicker
              selected={filters.date}
              onChange={(date) => handleFilterChange("date", date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
            />
            <select
              name="type"
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Type A">Type A</option>
              <option value="Type B">Type B</option>
              <option value="Type C">Type C</option>
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={handleResetFilters}>Reset Filter</button>
          </div>
          {view === "list" ? (
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
                  <p>
                    <strong>Address:</strong> {selectedWorkshop.address}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedWorkshop.date}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedWorkshop.type}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedWorkshop.status}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ClientWorkshopHistory;
