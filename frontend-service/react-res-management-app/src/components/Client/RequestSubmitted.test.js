import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RequestSubmitted from './RequestSubmitted';

describe('RequestSubmitted Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RequestSubmitted />
      </BrowserRouter>
    );
  });

  test('renders confirmation message correctly', () => {
    render(
      <BrowserRouter>
        <RequestSubmitted />
      </BrowserRouter>
    );
    expect(screen.getByText(/Request Submitted Successfully/i)).toBeInTheDocument();
  });

  test('renders navigation links correctly', () => {
    render(
      <BrowserRouter>
        <RequestSubmitted />
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    const linkTexts = links.map(link => link.textContent);

    expect(linkTexts).toContain('Home');
    expect(linkTexts).toContain('New Workshop Request');
    expect(linkTexts).toContain('Request Details');
    expect(linkTexts).toContain('Workshop History');
  });

  test('renders footer details correctly', () => {
    render(
      <BrowserRouter>
        <RequestSubmitted />
      </BrowserRouter>
    );
    const footerDetails = screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i);
    const phoneDetails = screen.getAllByText(/1672 345 0987/i);
    const emailDetails = screen.getByText(/info@company.io/i);

    expect(footerDetails).toHaveLength(2);
    expect(phoneDetails).toHaveLength(2);
    expect(emailDetails).toBeInTheDocument();
  });
});
