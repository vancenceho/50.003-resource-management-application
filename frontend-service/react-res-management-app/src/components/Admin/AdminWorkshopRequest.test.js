import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AdminWorkshopRequests from './AdminWorkshopRequests';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock fetch response
beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify([
    {
      _id: '1',
      name: 'Integration Workshop 1',
      location: '123 Main St',
      startDate: '2024-07-11T00:00:00.000Z',
      endDate: '2024-07-11T01:00:00.000Z',
      type: 'Business Value Discovery',
      status: 'Pending',
    },
    {
      _id: '2',
      name: 'Integration Workshop 2',
      location: '456 Elm St',
      startDate: '2024-07-12T00:00:00.000Z',
      endDate: '2024-07-12T01:00:00.000Z',
      type: 'AI Platform',
      status: 'Approved',
    },
  ]));
});

test('renders AdminWorkshopRequests and displays workshop data', async () => {
  render(
    <Router>
      <AdminWorkshopRequests />
    </Router>
  );

  // Ensure the component has finished loading
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Workshop Requests/i })).toBeInTheDocument();
  });

  // Check if the workshops are displayed
  await waitFor(() => {
    expect(screen.getByText(/Integration Workshop 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Integration Workshop 2/i)).toBeInTheDocument();
  });
});

test('filters workshop requests by type', async () => {
  render(
    <Router>
      <AdminWorkshopRequests />
    </Router>
  );

  // Ensure the component has finished loading
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Workshop Requests/i })).toBeInTheDocument();
  });

  // Select "Business Value Discovery" type
  const typeSelect = screen.getByLabelText('Type');
  fireEvent.change(typeSelect, { target: { value: 'Business Value Discovery' } });

  // Check if the filtered workshops are displayed
  await waitFor(() => {
    expect(screen.getByText(/Integration Workshop 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Integration Workshop 2/i)).not.toBeInTheDocument();
  });
});

test('filters workshop requests by status', async () => {
  render(
    <Router>
      <AdminWorkshopRequests />
    </Router>
  );

  // Ensure the component has finished loading
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Workshop Requests/i })).toBeInTheDocument();
  });

  // Select "Approved" status
  const statusSelect = screen.getByLabelText('Status');
  fireEvent.change(statusSelect, { target: { value: 'Approved' } });

  // Check if the filtered workshops are displayed
  await waitFor(() => {
    expect(screen.getByText(/Integration Workshop 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Integration Workshop 1/i)).not.toBeInTheDocument();
  });
});
