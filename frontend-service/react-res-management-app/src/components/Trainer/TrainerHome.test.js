// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import TrainerHome from './TrainerHome';

// describe('TrainerHome Component', () => {
//   test('renders without crashing', () => {
//     render(
//       <BrowserRouter>
//         <TrainerHome />
//       </BrowserRouter>
//     );
//   });

//   test('renders main content correctly', () => {
//     render(
//       <BrowserRouter>
//         <TrainerHome />
//       </BrowserRouter>
//     );
//     expect(screen.getByRole('main')).toBeInTheDocument();
//   });

//   test('renders header navigation links correctly', () => {
//     render(
//       <BrowserRouter>
//         <TrainerHome />
//       </BrowserRouter>
//     );
//     const links = screen.getAllByRole('link');
//     const linkTexts = links.map(link => link.textContent);

//     expect(linkTexts).toContain('Home');
//     expect(linkTexts).toContain('Workshop Requests');
//   });

//   test('renders main content cards correctly', () => {
//     render(
//       <BrowserRouter>
//         <TrainerHome />
//       </BrowserRouter>
//     );
//     const card = screen.getByAltText('Workshop Requests');
//     expect(card).toBeInTheDocument();
//     expect(card).toHaveAttribute('alt', 'Workshop Requests');
//   });

//   test('renders footer details correctly', () => {
//     render(
//       <BrowserRouter>
//         <TrainerHome />
//       </BrowserRouter>
//     );
//     const footerDetails = screen.getAllByText(/Level 1, 12 Sample St, Sydney NSW 2000/i);
//     const phoneDetails = screen.getAllByText(/1672 345 0987/i);
//     const emailDetails = screen.getByText(/info@company.io/i);

//     expect(footerDetails).toHaveLength(2);
//     expect(phoneDetails).toHaveLength(2);
//     expect(emailDetails).toBeInTheDocument();
//   });
// });