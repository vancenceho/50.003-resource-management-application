import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminHome from './AdminHome';

describe('AdminHome Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );
  });

  test('renders main content correctly', () => {
    render(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders header navigation links correctly', () => {
    render(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    const linkTexts = links.map(link => link.textContent);

    expect(linkTexts).toContain('Home');
    expect(linkTexts).toContain('Workshop Requests');
    expect(linkTexts).toContain('Dashboard');
    expect(linkTexts).toContain('Leave Requests');
    expect(linkTexts).toContain('New Admin');
    expect(linkTexts).toContain('New Trainer');
  });

  test('renders main content cards correctly', () => {
    render(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );
    const cards = screen.getAllByAltText(/Dashboard|Leave Requests|Workshop Requests/);

    expect(cards).toHaveLength(3);

    expect(cards[0]).toHaveAttribute('alt', 'Dashboard');
    expect(cards[1]).toHaveAttribute('alt', 'Leave Requests');
    expect(cards[2]).toHaveAttribute('alt', 'Workshop Requests');
  });

  test('renders footer details correctly', () => {
    render(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );
    const footerDetails = screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i);
    const phoneDetails = screen.getAllByText(/1672 345 0987/i);
    const emailDetails = screen.getByText(/info@company.io/i);

    expect(footerDetails).toHaveLength(2); // Since there are two instances of this address text
    expect(phoneDetails).toHaveLength(2); // Since there are two instances of this phone text
    expect(emailDetails).toBeInTheDocument();
  });
});
