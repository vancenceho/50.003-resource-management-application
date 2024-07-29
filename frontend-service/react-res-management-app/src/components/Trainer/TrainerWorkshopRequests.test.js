import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TrainerWorkshopRequests from './TrainerWorkshopRequests';

describe('TrainerWorkshopRequests Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <TrainerWorkshopRequests />
      </BrowserRouter>
    );
  });

  test('renders filter elements correctly', () => {
    render(
      <BrowserRouter>
        <TrainerWorkshopRequests />
      </BrowserRouter>
    );
    expect(screen.getByText(/Filter By/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Select Date/i)).toBeInTheDocument();
    expect(screen.getByText(/All Types/i)).toBeInTheDocument();
    expect(screen.getByText(/All Statuses/i)).toBeInTheDocument();
  });

  test('filters workshop data correctly', () => {
    render(
      <BrowserRouter>
        <TrainerWorkshopRequests />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Select Date/i), { target: { value: '2024-07-12' } });
    fireEvent.change(screen.getByText(/All Types/i), { target: { value: 'Type B' } });
    fireEvent.change(screen.getByText(/All Statuses/i), { target: { value: 'Accepted' } });

    expect(screen.getByText(/Workshop 2/i)).toBeInTheDocument();
    expect(screen.getByText(/979 Immanuel Ferry Suite 526/i)).toBeInTheDocument();
  });

  test('renders calendar view correctly', () => {
    render(
      <BrowserRouter>
        <TrainerWorkshopRequests />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText((content, element) => element.tagName.toLowerCase() === 'button' && content.includes('Calendar View')));
    expect(screen.getByText(/Workshop 1/i)).toBeInTheDocument();
  });
});
