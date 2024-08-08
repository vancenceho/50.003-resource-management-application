import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminCalendarView from './AdminCalendarView';

describe('AdminCalendarView', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <AdminCalendarView />
      </Router>
    );
    // Add specific assertions if needed
  });

  test('renders navigation links with correct text', () => {
    const { getByText } = render(
      <Router>
        <AdminCalendarView />
      </Router>
    );

    // Check each navigation link
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Workshop Requests/i)).toBeInTheDocument();
    expect(getByText(/Dashboard/i)).toBeInTheDocument();
    expect(getByText(/Leave Requests/i)).toBeInTheDocument();
    expect(getByText(/New Admin/i)).toBeInTheDocument();
    expect(getByText(/New Trainer/i)).toBeInTheDocument();
  });

  test('renders the calendar component', () => {
    const { container } = render(
      <Router>
        <AdminCalendarView />
      </Router>
    );

    // Check if the calendar is in the document
    const calendar = container.querySelector('.rbc-calendar');
    expect(calendar).toBeInTheDocument();
  });

  test('renders the header title correctly', () => {
    const { getByText } = render(
      <Router>
        <AdminCalendarView />
      </Router>
    );

    // Check header title text
    expect(getByText(/Workshop Calendar/i)).toBeInTheDocument();
  });
});
