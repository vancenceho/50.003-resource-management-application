import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import TrainerWorkshopRequests from './TrainerWorkshopRequests';

describe('TrainerWorkshopRequests Component', () => {
  test('renders the Trainer Workshop Requests page', async () => {
    render(
      <MemoryRouter>
        <TrainerWorkshopRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Workshop Requests/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Workshop Requests/i })).toBeInTheDocument();
  });

  test('renders navigation links', async () => {
    render(
      <MemoryRouter>
        <TrainerWorkshopRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Workshop Requests/i })).toBeInTheDocument();
  });

  test('renders list and calendar view buttons', async () => {
    render(
      <MemoryRouter>
        <TrainerWorkshopRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /List View/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Calendar View/i })).toBeInTheDocument();
    });
  });

  test('toggles between list and calendar views', async () => {
    render(
      <MemoryRouter>
        <TrainerWorkshopRequests />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /Calendar View/i }));
      expect(screen.getByRole('heading', { name: /Workshop Requests/i })).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /List View/i }));
      expect(screen.getByRole('heading', { name: /Workshop Requests/i })).toBeInTheDocument();
    });
  });
});
