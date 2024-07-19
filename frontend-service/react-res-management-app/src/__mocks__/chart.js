// src/__mocks__/chart.js
const Chart = jest.fn(() => ({
    update: jest.fn(),
    destroy: jest.fn(),
  }));
  
  export default Chart;
  