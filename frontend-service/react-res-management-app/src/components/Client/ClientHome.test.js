// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import ClientHome from './ClientHome';

// describe('ClientHome Component', () => {
//   test('renders without crashing', () => {
//     render(
//       <BrowserRouter>
//         <ClientHome />
//       </BrowserRouter>
//     );
//   });

//   test('renders main content correctly', () => {
//     render(
//       <BrowserRouter>
//         <ClientHome />
//       </BrowserRouter>
//     );
//     expect(screen.getByRole('main')).toBeInTheDocument();
//   });

//   test('renders header navigation links correctly', () => {
//     render(
//       <BrowserRouter>
//         <ClientHome />
//       </BrowserRouter>
//     );
//     const links = screen.getAllByRole('link');
//     const linkTexts = links.map(link => link.textContent);

//     expect(linkTexts).toContain('Home');
//     expect(linkTexts).toContain('New Workshop Request');
//     expect(linkTexts).toContain('Request Details');
//     expect(linkTexts).toContain('Workshop History');
//   });

//   test('renders main content cards correctly', () => {
//     render(
//       <BrowserRouter>
//         <ClientHome />
//       </BrowserRouter>
//     );
//     const cards = screen.getAllByAltText(/New Request|View Request|Workshop History/);

//     expect(cards).toHaveLength(3);

//     expect(cards[0]).toHaveAttribute('alt', 'New Request');
//     expect(cards[1]).toHaveAttribute('alt', 'View Request');
//     expect(cards[2]).toHaveAttribute('alt', 'Workshop History');
//   });

//   test('renders footer details correctly', () => {
//     render(
//       <BrowserRouter>
//         <ClientHome />
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