import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ClientLoginPage from './ClientLogin';

describe('ClientLoginPage Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ClientLoginPage />
      </BrowserRouter>
    );
  });

  test('renders form elements correctly', () => {
    render(
      <BrowserRouter>
        <ClientLoginPage />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test('handles form submission correctly', () => {
    render(
      <BrowserRouter>
        <ClientLoginPage />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Log In/i));
    
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });
});
