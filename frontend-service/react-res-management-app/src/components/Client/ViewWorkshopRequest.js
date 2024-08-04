import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ViewWorkshopRequest.css';

const ViewWorkshopRequest = () => {
    const { id } = useParams();
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
    });

    useEffect(() => {
        const fetchWorkshopDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/workshop/get/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const workshopDetails = await response.json();
                
                setFormData({
                    clientCompany: workshopDetails.client.company || '', // Assuming 'company' field in client data
                    clientType: workshopDetails.client.type || '', // Assuming 'type' field in client data
                    workshopName: workshopDetails.name,
                    workshopType: workshopDetails.type,
                    startDate: workshopDetails.startDate,
                    endDate: workshopDetails.endDate,
                    dealSizePotential: workshopDetails.dealSizePotential || '', // Adjust based on actual data
                    localOrOverseas: workshopDetails.location,
                    venue: workshopDetails.venue || '', // Adjust based on actual data
                    numberOfAttendees: workshopDetails.maxParticipants,
                    resourcesRequired: workshopDetails.resourcesRequired || '', // Adjust based on actual data
                    comments: workshopDetails.comments || '', // Adjust based on actual data
                });
            } catch (error) {
                console.error('Failed to fetch workshop details:', error);
            }
        };

        fetchWorkshopDetails();
    }, [id]);

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
                <h2>View Workshop Request</h2>
                <form>
                    <h3>View the workshop request details</h3>
                    <div className="form-group">
                        <label htmlFor="clientCompany">Client Company</label>
                        <input
                            type="text"
                            id="clientCompany"
                            name="clientCompany"
                            value={formData.clientCompany}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientType">Client Type</label>
                        <input
                            type="text"
                            id="clientType"
                            name="clientType"
                            value={formData.clientType}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workshopName">Workshop Name</label>
                        <input
                            type="text"
                            id="workshopName"
                            name="workshopName"
                            value={formData.workshopName}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workshopType">Workshop Type</label>
                        <input
                            type="text"
                            id="workshopType"
                            name="workshopType"
                            value={formData.workshopType}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dealSizePotential">Deal Size Potential (SGD)</label>
                        <input
                            type="text"
                            id="dealSizePotential"
                            name="dealSizePotential"
                            value={formData.dealSizePotential}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="localOrOverseas">Local/Overseas</label>
                        <input
                            type="text"
                            id="localOrOverseas"
                            name="localOrOverseas"
                            value={formData.localOrOverseas}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="venue">Venue</label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            value={formData.venue}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numberOfAttendees">Number of Attendees</label>
                        <input
                            type="text"
                            id="numberOfAttendees"
                            name="numberOfAttendees"
                            value={formData.numberOfAttendees}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="resourcesRequired">Resources Required</label>
                        <textarea
                            id="resourcesRequired"
                            name="resourcesRequired"
                            value={formData.resourcesRequired}
                            readOnly
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <textarea
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            readOnly
                        ></textarea>
                    </div>
                </form>
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
};

export default ViewWorkshopRequest;
