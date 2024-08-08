import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminLoginPage from './AdminLogin';

describe('AdminLoginPage Component', () => {
  test('renders without crashing', () => {
    render(<AdminLoginPage />);
  });

  test('renders the login form correctly', () => {
    render(<AdminLoginPage />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('updates username and password fields on input change', () => {
    render(<AdminLoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });

  test('handles form submission', () => {
    render(<AdminLoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Log In');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(loginButton);

    // Assuming handleSubmit logs the username and password
    // This can be verified by checking console output or mock function
    // For this test case, you might want to mock the console or verify side effects
  });

  test('renders the Dell logo correctly', () => {
    render(<AdminLoginPage />);
    expect(screen.getByAltText('Dell Technologies')).toBeInTheDocument();
  });

  test('renders header text correctly', () => {
    render(<AdminLoginPage />);
    expect(screen.getByText('Sign In To Admin Account')).toBeInTheDocument();
  });
});
