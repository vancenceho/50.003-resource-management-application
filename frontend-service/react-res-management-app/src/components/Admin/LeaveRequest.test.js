// src/components/Admin/LeaveRequest.test.js

import { render } from '@testing-library/react';
import LeaveRequests from './LeaveRequests';
import { BrowserRouter as Router } from 'react-router-dom';

// Render component with Router to handle routing context
const renderWithRouter = (ui) => render(<Router>{ui}</Router>);

test('renders LeaveRequests component without crashing', () => {
  renderWithRouter(<LeaveRequests />);
  
  // If the component renders without crashing, the test will pass
});

