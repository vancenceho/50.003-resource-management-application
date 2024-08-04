import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RequestSubmitted from './RequestSubmitted';

test('renders RequestSubmitted', () => {
    render(
        <Router>
            <RequestSubmitted />
        </Router>
    );

    // Check if the heading is present
    expect(screen.getByRole('heading', { name: /Request Submitted Successfully/i })).toBeInTheDocument();
    
    // Check if the navigation links are present
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /New Workshop Request/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Workshop History/i })).toBeInTheDocument();

    // Check if the confirmation image is present
    expect(screen.getByAltText(/Confirmation Image/i)).toBeInTheDocument();

    // Check if footer content is present using getAllByText
    const footerTexts = screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i);
    expect(footerTexts).toHaveLength(2);
    
    expect(screen.getByText(/info@company.io/i)).toBeInTheDocument();
});
