import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import EditWorkshopRequest from './EditWorkshopRequest';

// Mock fetch response
beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify({
    client: {
      company: 'XYZ Corp',
    },
    name: 'AI Workshop',
    type: 'AI Platform',
    startDate: '2024-07-15T00:00:00.000Z',
    endDate: '2024-07-15T01:00:00.000Z',
    location: 'Local',
    maxParticipants: '20-50',
    trainer: {
      _id: 'trainer123',
    },
  }));
});

describe('EditWorkshopRequest Component', () => {
  // Test if the component renders correctly
  test('renders the Edit Workshop Request page and form fields', async () => {
    render(
      <MemoryRouter>
        <EditWorkshopRequest />
      </MemoryRouter>
    );

    // Ensure the component has finished loading
    await waitFor(() => {
      expect(screen.getByText('Edit Workshop Request')).toBeInTheDocument();
    });

    // Check if the main header and form fields are present
    expect(screen.getByText('Fill in the modified details below to edit the workshop request')).toBeInTheDocument();
    expect(screen.getByLabelText('Client Company')).toBeInTheDocument();
    expect(screen.getByLabelText('Client Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Workshop Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Workshop Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Deal Size Potential (SGD)')).toBeInTheDocument();
    expect(screen.getByLabelText('Local/Overseas')).toBeInTheDocument();
    expect(screen.getByLabelText('Venue')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Attendees')).toBeInTheDocument();
    expect(screen.getByLabelText('Resources Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Comments')).toBeInTheDocument();
    expect(screen.getByLabelText('Trainer')).toBeInTheDocument();
  });

  // Test form input handling
  test('handles form input changes', async () => {
    render(
      <MemoryRouter>
        <EditWorkshopRequest />
      </MemoryRouter>
    );

    // Ensure the component has finished loading
    await waitFor(() => {
      expect(screen.getByLabelText('Client Company')).toBeInTheDocument();
    });

    // Simulate user input for some fields
    fireEvent.change(screen.getByLabelText('Client Company'), { target: { value: 'ABC Corp' } });
    expect(screen.getByLabelText('Client Company').value).toBe('ABC Corp');

    fireEvent.change(screen.getByLabelText('Client Type'), { target: { value: 'Client Type A' } });
    expect(screen.getByLabelText('Client Type').value).toBe('Client Type A');
  });

  // Test navigation links
  test('renders navigation links', async () => {
    render(
      <MemoryRouter>
        <EditWorkshopRequest />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Workshop Requests')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Leave Requests')).toBeInTheDocument();
  });

  // Test footer rendering
  test('renders footer with essential contact information', async () => {
    render(
      <MemoryRouter>
        <EditWorkshopRequest />
      </MemoryRouter>
    );

    // Ensure the component has finished loading
    await waitFor(() => {
      expect(screen.getByText('info@company.io')).toBeInTheDocument();
    });

    // Check if the footer elements are present and match the expected text
    const addressTexts = screen.getAllByText('Level 1, 12 Sample St, Sydney NSW 2000');
    expect(addressTexts.length).toBeGreaterThanOrEqual(1); // Allow for multiple instances

    const phoneTexts = screen.getAllByText('1672 345 0987');
    expect(phoneTexts.length).toBeGreaterThanOrEqual(1); // Allow for multiple instances

    const emailTexts = screen.getAllByText('info@company.io');
    expect(emailTexts.length).toBeGreaterThanOrEqual(1); // Allow for multiple instances
  });
});
