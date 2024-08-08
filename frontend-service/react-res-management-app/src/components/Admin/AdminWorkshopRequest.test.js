import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminWorkshopRequests from './AdminWorkshopRequests';

describe('AdminWorkshopRequests', () => {
  test('renders header with navigation links', () => {
    render(
      <BrowserRouter>
        <AdminWorkshopRequests />
      </BrowserRouter>
    );

    const homeLink = screen.getByText(/Home/i);
    const workshopRequestsLinks = screen.getAllByText(/Workshop Requests/i);
    const dashboardLink = screen.getByText(/Dashboard/i);
    const leaveRequestsLink = screen.getByText(/Leave Requests/i);
    const newAdminLink = screen.getByText(/New Admin/i);
    const newTrainerLink = screen.getByText(/New Trainer/i);

    expect(homeLink).toBeInTheDocument();
    expect(workshopRequestsLinks.length).toBeGreaterThan(0);
    expect(dashboardLink).toBeInTheDocument();
    expect(leaveRequestsLink).toBeInTheDocument();
    expect(newAdminLink).toBeInTheDocument();
    expect(newTrainerLink).toBeInTheDocument();
  });

  test('renders workshop requests heading', () => {
    render(
      <BrowserRouter>
        <AdminWorkshopRequests />
      </BrowserRouter>
    );

    const headings = screen.getAllByText(/Workshop Requests/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  test('toggles between list and calendar views', () => {
    render(
      <BrowserRouter>
        <AdminWorkshopRequests />
      </BrowserRouter>
    );

    const listViewButton = screen.getByText(/List View/i);
    const calendarViewButton = screen.getByText(/Calendar View/i);

    fireEvent.click(calendarViewButton);
    const calendarElement = screen.getByText(/Workshop 1/i);
    expect(calendarElement).toBeInTheDocument();

    fireEvent.click(listViewButton);
    const tableElement = screen.getByText(/Workshop 1/i);
    expect(tableElement).toBeInTheDocument();
  });

  test('filters workshop requests by date', () => {
    render(
      <BrowserRouter>
        <AdminWorkshopRequests />
      </BrowserRouter>
    );

    const datePicker = screen.getByPlaceholderText(/Select Date/i);
    fireEvent.change(datePicker, { target: { value: '2024-07-11' } });

    const workshop1 = screen.getByText(/Workshop 1/i);
    expect(workshop1).toBeInTheDocument();

    const workshop2 = screen.queryByText(/Workshop 2/i);
    expect(workshop2).not.toBeInTheDocument();
  });

  test('filters workshop requests by type', () => {
    render(
      <BrowserRouter>
        <AdminWorkshopRequests />
      </BrowserRouter>
    );

    const typeSelect = screen.getByDisplayValue(/All Types/i);
    fireEvent.change(typeSelect, { target: { value: 'Type A' } });

    const workshop1 = screen.getByText(/Workshop 1/i);
    expect(workshop1).toBeInTheDocument();

    const workshop2 = screen.queryByText(/Workshop 2/i);
    expect(workshop2).not.toBeInTheDocument();
  });

  test('filters workshop requests by status', () => {
    render(
      <BrowserRouter>
        <AdminWorkshopRequests />
      </BrowserRouter>
    );

    const statusSelect = screen.getByDisplayValue(/All Statuses/i);
    fireEvent.change(statusSelect, { target: { value: 'Accepted' } });

    const workshop1 = screen.getByText(/Workshop 1/i);
    expect(workshop1).toBeInTheDocument();

    const workshop2 = screen.queryByText(/Workshop 2/i);
    expect(workshop2).not.toBeInTheDocument();
  });

  test('resets filters', () => {
    render(
      <BrowserRouter>
        <AdminWorkshopRequests />
      </BrowserRouter>
    );

    const resetButton = screen.getByText(/Reset Filter/i);
    fireEvent.click(resetButton);

    const workshop1 = screen.getByText(/Workshop 1/i);
    const workshop2 = screen.getByText(/Workshop 2/i);

    expect(workshop1).toBeInTheDocument();
    expect(workshop2).toBeInTheDocument();
  });
});
