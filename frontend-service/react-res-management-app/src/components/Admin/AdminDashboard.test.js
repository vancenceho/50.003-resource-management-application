import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import Chart from 'chart.js';

// Mock Chart.js
jest.mock('chart.js');

describe('AdminDashboard', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );
  });

  test('renders dashboard elements', () => {
    const { getByTestId } = render(
      <Router>
        <AdminDashboard />
      </Router>
    );

    // Ensure that some elements exist in the dashboard
    expect(getByTestId('pipeline-chart')).toBeInTheDocument();
    expect(getByTestId('deal-sizes-chart')).toBeInTheDocument();
  });
});
