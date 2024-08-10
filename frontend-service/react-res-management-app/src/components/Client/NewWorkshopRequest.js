import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./NewWorkshopRequest.css";
import axios from "axios";
import moment from "moment";
import NavBar from "./NavBar";
import Footer from "../../footer";

const NewWorkshopRequest = () => {
  useEffect(() => {
    document.title = "Dell Resources | New Workshop Request";
  }, []);
  const [formData, setFormData] = useState({
    clientCompany: "",
    clientType: "",
    workshopName: "",
    resourcesRequired: "",
    startDate: "",
    endDate: "",
    localOrOverseas: "",
    timeStart: "",
    timeEnd: "",
    duration: "",
    status: "",
    workshopType: "",
    numberOfAttendees: "",
    dealSizePotential: "",
  });

  const clientUsername = localStorage.getItem("username");
  const clientId = localStorage.getItem("userId");

  const calculateDuration = (startDate, endDate, timeStart, timeEnd) => {
    // Calculate duration in from startDate and endDate + timeStart and timeEnd
    const start = moment(`${startDate} ${timeStart}`, "DD-MM-YYYY HH:mm");
    const end = moment(`${endDate} ${timeEnd}`, "DD-MM-YYYY HH:mm");
    const duration = moment.duration(end.diff(start));
    return duration.asHours();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const correspondingTextboxName = `${e.target.name}Textbox`;
    if (formData.hasOwnProperty(correspondingTextboxName)) {
      setFormData({ ...formData, [correspondingTextboxName]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      clientCompany,
      clientType,
      workshopName,
      resourcesRequired,
      startDate,
      endDate,
      localOrOverseas,
      timeStart,
      timeEnd,
      numberOfAttendees,
      workshopType,
      dealSizePotential,
    } = formData;

    if (
      !clientCompany ||
      !clientType ||
      !workshopName ||
      !resourcesRequired ||
      !startDate ||
      !endDate ||
      !localOrOverseas ||
      !timeStart ||
      !timeEnd ||
      !numberOfAttendees ||
      !workshopType ||
      !dealSizePotential
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newWorkshopRequest = {
      clientCompany: clientCompany,
      clientType: clientType,
      name: workshopName,
      description: resourcesRequired,
      startDate: startDate,
      endDate: endDate,
      location: localOrOverseas,
      timeStart: timeStart,
      timeEnd: timeEnd,
      duration: calculateDuration(startDate, endDate, timeStart, timeEnd),
      status: "pending",
      maxParticipants: numberOfAttendees,
      type: workshopType,
      dealSize: dealSizePotential,
      client: clientId,
      trainerId: [],
    };

    axios
      .post("http://localhost:3000/client/addworkshop", newWorkshopRequest, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Workshop request submitted successfully");
        window.location.href = "/client-request-submitted";
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
      <div className="edit-workshop-request">
        <h2>New Workshop Request</h2>
        <form onSubmit={handleSubmit}>
          <h3>Fill in the details below to create a new workshop request</h3>
          <div className="form-group">
            <label htmlFor="clientCompany">Client Company</label>
            <input
              type="text"
              id="clientCompany"
              name="clientCompany"
              value={formData.clientCompany}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="clientType">Client Type</label>
            <select
              id="clientType"
              name="clientType"
              value={formData.clientType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Client Type
              </option>
              <option value="Client Type A">Client Type A</option>
              <option value="Client Type B">Client Type B</option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="workshopName">Workshop Name</label>
            <input
              type="text"
              id="workshopName"
              name="workshopName"
              value={formData.workshopName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="workshopType">Workshop Type</label>
            <select
              id="workshopType"
              name="workshopType"
              value={formData.workshopType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Workshop Type
              </option>
              <option value="Business Value Discovery">
                Business Value Discovery
              </option>
              <option value="AI Platform">AI Platform</option>
              <option value="Infrastructure and Demo">
                Infrastructure and Demo
              </option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dealSizePotential">Deal Size Potential (SGD)</label>
            <input
              type="text"
              id="dealSizePotential"
              name="dealSizePotential"
              value={formData.dealSizePotential}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="localOrOverseas">Local/Overseas</label>
            <select
              id="localOrOverseas"
              name="localOrOverseas"
              value={formData.localOrOverseas}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Local">Local</option>
              <option value="Overseas">Overseas</option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="timeStart">Start Time</label>
            <input
              type="time"
              id="timeStart"
              name="timeStart"
              value={formData.timeStart}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeEnd">End Time</label>
            <input
              type="time"
              id="timeEnd"
              name="timeEnd"
              value={formData.timeEnd}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfAttendees">Number of Attendees</label>
            <select
              id="numberOfAttendees"
              name="numberOfAttendees"
              value={formData.numberOfAttendees}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Number
              </option>
              <option value="<10">Less than 10</option>
              <option value="10-20">10-20</option>
              <option value="20-50">20-50</option>
              <option value=">50">Greater than 50</option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="resourcesRequired">Resources Required</label>
            <textarea
              id="resourcesRequired"
              name="resourcesRequired"
              value={formData.resourcesRequired}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="submit-request-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default NewWorkshopRequest;
