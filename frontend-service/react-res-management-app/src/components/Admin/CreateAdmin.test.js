import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateAdminAccount from './CreateAdmin'; // Adjust the import path if needed

describe('CreateAdminAccount Component', () => {
  // Test that component renders without crashing
  test('renders without crashing', () => {
    render(
      <Router>
        <CreateAdminAccount />
      </Router>
    );
  });

  // Test that the main title is rendered correctly
  test('renders main title correctly', () => {
    render(
      <Router>
        <CreateAdminAccount />
      </Router>
    );
    expect(screen.getByText('New Admin Account')).toBeInTheDocument();
  });

  // Test that all form elements are rendered
  test('renders form elements correctly', () => {
    render(
      <Router>
        <CreateAdminAccount />
      </Router>
    );

    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  // Test that form values update on change
  test('updates form values on input change', () => {
    render(
      <Router>
        <CreateAdminAccount />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/First Name:/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name:/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'test123' } });

    expect(screen.getByLabelText(/Username:/i).value).toBe('testuser');
    expect(screen.getByLabelText(/First Name:/i).value).toBe('John');
    expect(screen.getByLabelText(/Last Name:/i).value).toBe('Doe');
    expect(screen.getByLabelText(/Email:/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password:/i).value).toBe('test123');
  });

  // Test if the form can be submitted
  test('form can be submitted', () => {
    // Assuming the form submission behavior involves a submit button
    // If there's no actual submit handler, this test may need adjustment
    render(
      <Router>
        <CreateAdminAccount />
      </Router>
    );

    const submitButton = screen.getByText('Confirm');
    fireEvent.click(submitButton);
    
    // Add more assertions if there's specific behavior on submit
  });

  // Test that header navigation links are rendered correctly
  test('renders header navigation links correctly', () => {
    render(
      <Router>
        <CreateAdminAccount />
      </Router>
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

  // Test footer details are rendered correctly
  test('renders footer details correctly', () => {
    render(
      <Router>
        <CreateAdminAccount />
      </Router>
    );

    expect(screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i)).toHaveLength(2);
    expect(screen.getAllByText(/1672 345 0987/i)).toHaveLength(2);
    expect(screen.getByText(/info@company.io/i)).toBeInTheDocument();
  });
});
