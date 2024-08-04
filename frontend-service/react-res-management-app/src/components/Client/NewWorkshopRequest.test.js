import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewWorkshopRequest from './NewWorkshopRequest';

// Mock the navigate function
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify({}));
});

test('renders NewWorkshopRequest and submits form', async () => {
  render(
    <Router>
      <NewWorkshopRequest />
    </Router>
  );

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Client Company/i), { target: { value: 'Test Company' } });
  fireEvent.change(screen.getByLabelText(/Client Type/i), { target: { value: 'Client Type A' } });
  fireEvent.change(screen.getByLabelText(/Workshop Name/i), { target: { value: 'Test Workshop' } });
  fireEvent.change(screen.getByLabelText(/Workshop Type/i), { target: { value: 'Business Value Discovery' } });
  fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-07-01' } });
  fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-07-02' } });
  fireEvent.change(screen.getByLabelText(/Deal Size Potential/i), { target: { value: '10000' } });
  fireEvent.change(screen.getByLabelText(/Local\/Overseas/i), { target: { value: 'Local' } });
  fireEvent.change(screen.getByLabelText(/Venue/i), { target: { value: 'Test Venue' } });
  fireEvent.change(screen.getByLabelText(/Number of Attendees/i), { target: { value: '<10' } });
  fireEvent.change(screen.getByLabelText(/Resources Required/i), { target: { value: 'Test Resources' } });
  fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Test Comments' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  // Check if the form submission triggers the expected network request
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/workshop/add/', expect.anything());
  });

  // Check if the navigation to the submitted page happens
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/client-request-submitted');
  });
});
