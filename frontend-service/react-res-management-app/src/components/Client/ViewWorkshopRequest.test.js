import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewWorkshopRequest from './ViewWorkshopRequest';

test('renders ViewWorkshopRequest', () => {
    render(
        <Router>
            <ViewWorkshopRequest />
        </Router>
    );

    // Check if the heading is present
    expect(screen.getByRole('heading', { name: /View Workshop Request/i })).toBeInTheDocument();

    // Check if form fields are present
    expect(screen.getByLabelText(/Client Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Client Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Workshop Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Workshop Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deal Size Potential/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Local\/Overseas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Venue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Attendees/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Resources Required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comments/i)).toBeInTheDocument();

    // Check if navigation links are present
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /New Workshop Request/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Workshop History/i })).toBeInTheDocument();

    // Check if footer content is present using getAllByText
    const footerTexts = screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i);
    expect(footerTexts).toHaveLength(1);

    expect(screen.getByText(/info@company.io/i)).toBeInTheDocument();
});
