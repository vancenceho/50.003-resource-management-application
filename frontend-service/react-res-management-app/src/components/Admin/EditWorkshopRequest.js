import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './EditWorkshopRequest.css';

const EditWorkshopRequest = () => {
    const [formData, setFormData] = useState({
        clientCompany: '',
        clientType: '',
        workshopName: '',
        workshopType: '',
        startDate: '',
        endDate: '',
        dealSizePotential: '',
        localOrOverseas: '',
        venue: '',
        numberOfAttendees: '',
        resourcesRequired: '',
        comments: '',
        trainer: ''
    });

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
        // Handle form submission logic here
    };

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
        <div className="edit-workshop-request">
            <h2>Edit Workshop Request</h2>
            <form onSubmit={handleSubmit}>
                <h3>Fill in the modified details below to edit the workshop request</h3>
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
                        <option value="" disabled>Select Client Type</option>
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
                        <option value="" disabled>Select Workshop Type</option>
                        <option value="Business Value Discovery">Business Value Discovery</option>
                        <option value="AI Platform">AI Platform</option>
                        <option value="Infrastructure and Demo">Infrastructure and Demo</option>
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
                        <option value="" disabled>Select Location</option>
                        <option value="Local" >Local</option>
                        <option value="Overseas" >Overseas</option>
                        {/* Add other options here */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
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
                        <option value="" disabled>Select Number</option>
                        <option value="<10" >Less than 10</option>
                        <option value="10-20" >10-20</option>
                        <option value="20-50" >20-50</option>
                        <option value=">50" >Greater than 50</option>
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
                <div className="form-group">
                    <label htmlFor="comments">Comments</label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="trainer">Trainer</label>
                    <select
                        id="trainer"
                        name="trainer"
                        value={formData.trainer}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Trainer</option>
                        <option value="Trainer A">Trainer A</option>
                        <option value="Trainer B">Trainer B</option>
                        {/* Add other options here */}
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="accept-btn">Accept</button>
                    <button type="button" className="reject-btn">Reject</button>
                </div>
                <div className="form-actions">
                    <button type="button" className="confirm-changes-btn">Confirm Changes</button>
                </div>
            </form>
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
      </>
    );
};

export default EditWorkshopRequest;
