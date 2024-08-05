import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminLoginPage from './AdminLogin';

beforeAll(() => {
  global.console = {
    log: jest.fn(),
    // Add other console methods if needed
  };
});

test('renders AdminLoginPage', () => {
  render(
    <Router>
      <AdminLoginPage />
    </Router>
  );

  // Check if the logo is present
  const logo = screen.getByAltText(/Dell Technologies/i);
  expect(logo).toBeInTheDocument();

  // Check if the heading is present
  expect(screen.getByRole('heading', { name: /Sign In To Admin Account/i })).toBeInTheDocument();

  // Check if the username and password input fields are present
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

  // Check if the login button is present
  expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
});

test('submits the login form', () => {
  render(
    <Router>
      <AdminLoginPage />
    </Router>
  );

  // Fill in the username and password fields
  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testadmin' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'adminpassword' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

  // Check if the console logs are correct
  expect(console.log).toHaveBeenCalledWith('Username:', 'testadmin');
  expect(console.log).toHaveBeenCalledWith('Password:', 'adminpassword');
});
