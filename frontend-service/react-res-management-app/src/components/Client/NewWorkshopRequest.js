import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './NewWorkshopRequest.css';

const NewWorkshopRequest = () => {
    const navigate = useNavigate();
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
        comments: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return duration;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const placeholderClientId = localStorage.getItem('userId');

        const duration = calculateDuration(formData.startDate, formData.endDate);

        const requestBody = {
            _id: uuidv4(), // Generate a unique ID
            name: formData.workshopName,
            description: formData.comments || '-',
            startDate: formData.startDate,
            endDate: formData.endDate,
            location: formData.localOrOverseas,
            timeStart: '9:00 AM', // Placeholder time, replace if needed
            timeEnd: '5:00 PM', // Placeholder time, replace if needed
            duration: duration,
            status: 'Pending',
            type: formData.workshopType,
            maxParticipants: formData.numberOfAttendees === '<10' ? 9 :
                            formData.numberOfAttendees === '10-20' ? 20 :
                            formData.numberOfAttendees === '20-50' ? 50 : 100,
            client: placeholderClientId, // Placeholder client ID
            trainer: {
                _id: '' // Empty trainer ID
            }
        };

        try {
            const response = await fetch('http://localhost:3000/workshop/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Workshop request submitted: ', data);
            navigate('/client-request-submitted');
        } catch (error) {
            console.error('Error submitting workshop request: ', error);
            if (error.response) {
                console.error('Error response data: ', error.response.data);
            }
        }
    };

    return (
        <>
            <header className="App-header">
                <nav className="navbar">
                    <ul className="navbar-list">
                        <li><Link to="/client-home">Home</Link></li>
                        <li><Link to="/client-new-request">New Workshop Request</Link></li>
                        <li><Link to="/client-workshop-history">Workshop History</Link></li>
                    </ul>
                </nav>
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
                            <option value="Local">Local</option>
                            <option value="Overseas">Overseas</option>
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
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <textarea
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-request-btn">Submit</button>
                    </div>
                </form>
            </div>
            <footer className="footer">
                <div className="footer-content">
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
                    <p>&copy; 2023 Company Name. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default NewWorkshopRequest;