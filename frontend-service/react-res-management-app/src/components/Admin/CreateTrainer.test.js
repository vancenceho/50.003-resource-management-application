// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import CreateTrainerAccount from './CreateTrainer';

// describe('CreateTrainerAccount Component', () => {
//   test('renders without crashing', () => {
//     render(
//       <BrowserRouter>
//         <CreateTrainerAccount />
//       </BrowserRouter>
//     );
//   });

//   test('renders main title correctly', () => {
//     render(
//       <BrowserRouter>
//         <CreateTrainerAccount />
//       </BrowserRouter>
//     );
//     const titleElement = screen.getByText('New Trainer Account');
//     expect(titleElement).toBeInTheDocument();
//   });

//   test('renders form elements correctly', () => {
//     render(
//       <BrowserRouter>
//         <CreateTrainerAccount />
//       </BrowserRouter>
//     );
//     expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
//   });

//   test('renders header navigation links correctly', () => {
//     render(
//       <BrowserRouter>
//         <CreateTrainerAccount />
//       </BrowserRouter>
//     );
//     const links = screen.getAllByRole('link');
//     const linkTexts = links.map(link => link.textContent);

//     expect(linkTexts).toContain('Home');
//     expect(linkTexts).toContain('Workshop Requests');
//     expect(linkTexts).toContain('Dashboard');
//     expect(linkTexts).toContain('Leave Requests');
//     expect(linkTexts).toContain('New Admin');
//     expect(linkTexts).toContain('New Trainer');
//   });

//   test('renders footer details correctly', () => {
//     render(
//       <BrowserRouter>
//         <CreateTrainerAccount />
//       </BrowserRouter>
//     );
//     const footerDetails = screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i);
//     const phoneDetails = screen.getAllByText(/1672 345 0987/i);
//     const emailDetails = screen.getByText(/info@company.io/i);

//     expect(footerDetails).toHaveLength(2); // Since there are two instances of this address text
//     expect(phoneDetails).toHaveLength(2); // Since there are two instances of this phone text
//     expect(emailDetails).toBeInTheDocument();
//   });
// });
