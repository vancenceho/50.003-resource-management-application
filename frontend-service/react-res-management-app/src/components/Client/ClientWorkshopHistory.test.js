import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientWorkshopHistory from './ClientWorkshopHistory';

// Mock fetch to avoid errors during test
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test('renders ClientWorkshopHistory', () => {
  render(
    <Router>
      <ClientWorkshopHistory />
    </Router>
  );

  // Check if the heading is present
  expect(screen.getByRole('heading', { name: /Workshop Request History/i })).toBeInTheDocument();

  // Check if filters are present
  expect(screen.getByText(/Filter By/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Select Date/i)).toBeInTheDocument();
  expect(screen.getByText(/All Types/i)).toBeInTheDocument();
  expect(screen.getByText(/All Statuses/i)).toBeInTheDocument();
  expect(screen.getByText(/Reset Filter/i)).toBeInTheDocument();

  // Check if table headers are present
  expect(screen.getByText(/ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Workshop Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Address/i)).toBeInTheDocument();
  expect(screen.getByText(/Date/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Type/i)[0]).toBeInTheDocument();
  expect(screen.getAllByText(/Status/i)[0]).toBeInTheDocument();

  // Check if navigation links are present
  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /New Workshop Request/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Workshop History/i })).toBeInTheDocument();

  // Check if footer content is present using getAllByText
  const footerTexts = screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i);
  expect(footerTexts).toHaveLength(1);

  expect(screen.getByText(/info@company.io/i)).toBeInTheDocument();
});
