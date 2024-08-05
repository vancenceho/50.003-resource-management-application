import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AdminCalendarView from './AdminCalendarView';

describe('AdminCalendarView Component', () => {
  // Increase timeout to 10 seconds for all tests in this suite
  jest.setTimeout(10000);

  test('renders the Admin Calendar View page and calendar', async () => {
    render(
      <MemoryRouter>
        <AdminCalendarView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Workshop Calendar/i })).toBeInTheDocument();
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Workshop Requests')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Leave Requests')).toBeInTheDocument();
  });

  test('renders navigation links', async () => {
    render(
      <MemoryRouter>
        <AdminCalendarView />
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
});
