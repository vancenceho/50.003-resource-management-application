import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sign in links', () => {
  render(<App />);

  const adminLink = screen.getByText(/Admin/i);
  const trainerLink = screen.getByText(/Trainer/i);
  const clientLink = screen.getByText(/Client/i);
  const createAccountLink = screen.getByText(/Create New Account/i);

  expect(adminLink).toBeInTheDocument();
  expect(trainerLink).toBeInTheDocument();
  expect(clientLink).toBeInTheDocument();
  expect(createAccountLink).toBeInTheDocument();
});
