import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LeaveRequests from './LeaveRequests';

// Mock fetch response
beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify([
    {
      _id: '1',
      trainer: '668d5ba4a5f8eca9ff47283e',
      reason: 'Medical Leave',
      startDate: '2024-07-11T00:00:00.000Z',
      status: 'Pending',
    },
    {
      _id: '2',
      trainer: '668d5ba4a5f8eca9ff47284e',
      reason: 'Vacation',
      startDate: '2024-07-12T00:00:00.000Z',
      status: 'Accepted',
    },
  ]));
});

describe('LeaveRequests Component', () => {
  test('renders the Leave Requests page and table fields', async () => {
    render(
      <MemoryRouter>
        <LeaveRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Leave Requests/i })).toBeInTheDocument();
    });

    expect(screen.getByText('Filter By')).toBeInTheDocument();
    expect(screen.getByText('Trainer Name')).toBeInTheDocument();
    expect(screen.getByText('Reason')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getAllByText('Status').length).toBeGreaterThanOrEqual(1);
  });

  test('handles form input changes', async () => {
    render(
      <MemoryRouter>
        <LeaveRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Filter By')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Select Date'), { target: { value: '2024-07-11' } });
    expect(screen.getByPlaceholderText('Select Date').value).toBe('2024-07-11');

    fireEvent.change(screen.getByLabelText('Trainer'), { target: { value: 'Trainer 1' } });
    expect(screen.getByLabelText('Trainer').value).toBe('Trainer 1');
  });

  test('renders navigation links', async () => {
    render(
      <MemoryRouter>
        <LeaveRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Workshop Requests')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getAllByText('Leave Requests')[0]).toBeInTheDocument();
  });

  test('renders footer with essential contact information', async () => {
    render(
      <MemoryRouter>
        <LeaveRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('info@company.io')).toBeInTheDocument();
    });

    const addressTexts = screen.getAllByText('Level 1, 12 Sample St, Sydney NSW 2000');
    expect(addressTexts.length).toBeGreaterThanOrEqual(1);

    const phoneTexts = screen.getAllByText('1672 345 0987');
    expect(phoneTexts.length).toBeGreaterThanOrEqual(1);

    const emailTexts = screen.getAllByText('info@company.io');
    expect(emailTexts.length).toBeGreaterThanOrEqual(1);
  });
});
