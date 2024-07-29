import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewWorkshopRequest from './NewWorkshopRequest';

describe('NewWorkshopRequest Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <NewWorkshopRequest />
      </BrowserRouter>
    );
  });

  test('renders form elements correctly', () => {
    render(
      <BrowserRouter>
        <NewWorkshopRequest />
      </BrowserRouter>
    );
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
  });

  test('handles form input changes correctly', () => {
    render(
      <BrowserRouter>
        <NewWorkshopRequest />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Client Company/i), { target: { value: 'Test Company' } });
    expect(screen.getByDisplayValue(/Test Company/i)).toBeInTheDocument();
  });
});
