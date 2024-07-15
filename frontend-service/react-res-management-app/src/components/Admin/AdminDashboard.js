import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const dealSizesChartRef = useRef(null);
  const pipelineChartRef = useRef(null);
  const trainerBreakdownChartRef = useRef(null);

  useEffect(() => {
    // Deal Sizes Chart
    const ctxDealSizes = dealSizesChartRef.current.getContext('2d');
    const dealSizesChart = new Chart(ctxDealSizes, {
      type: 'line',
      data: {
        labels: ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k'],
        datasets: [{
          label: 'Deal Size',
          data: [30, 50, 80, 60, 70, 50, 40, 60, 70, 90, 60, 70],
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Pipeline Breakdown Chart
    const ctxPipeline = pipelineChartRef.current.getContext('2d');
    const pipelineChart = new Chart(ctxPipeline, {
      type: 'doughnut',
      data: {
        labels: ['Accepted', 'Pending', 'Rejected'],
        datasets: [{
          label: 'Pipeline',
          data: [60, 30, 10],
          backgroundColor: [
            'rgba(0, 123, 255, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(220, 53, 69, 1)'
          ],
          borderWidth: 5
        }]
      },
      options: {
        responsive: true
      }
    });

    // Trainer Breakdown Chart
    const ctxTrainerBreakdown = trainerBreakdownChartRef.current.getContext('2d');
    const trainerBreakdownChart = new Chart(ctxTrainerBreakdown, {
      type: 'bar',
      data: {
        labels: ['Trainer 1', 'Trainer 2', 'Trainer 3', 'Trainer 4'],
        datasets: [{
          label: 'Sessions',
          data: [40, 50, 70, 30],
          backgroundColor: [
            'rgba(0, 123, 255, 0.8)',
            'rgba(0, 123, 255, 0.6)',
            'rgba(0, 123, 255, 0.4)',
            'rgba(0, 123, 255, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup function to destroy charts
    return () => {
      dealSizesChart.destroy();
      pipelineChart.destroy();
      trainerBreakdownChart.destroy();
    };
  }, []);

  return (
    <>
    <div className="container">
      <main>
        <h1>DASHBOARD</h1>
        <div className="stats">
          <div className="stat">
            <p>Total Requests</p>
            <h8>406</h8>
          </div>
          <div className="stat">
            <p>Accepted Requests</p>
            <h8>293</h8>
          </div>
          <div className="stat">
            <p>Pending Requests</p>
            <h8>89</h8>
          </div>
          <div className="stat">
            <p>Rejected Requests</p>
            <h8>24</h8>
          </div>
        </div>
        <div className="charts">
          <div className="chart wide">
            <h2>Workshop Deal Sizes</h2>
            <canvas id="dealSizesChart" ref={dealSizesChartRef}></canvas>
          </div>
          <div className="chart medium">
            <h2>Pipeline Breakdown</h2>
            <canvas id="pipelineChart" ref={pipelineChartRef}></canvas>
          </div>
          <div className="chart medium">
            <div className="chart small">
            <h3>Total Pipeline</h3>
            <h7>75000</h7>
            </div>
            <div className="chart small">
            <h3>Total Trainers</h3>
            <h7>27</h7>
            </div>
          </div>
          <div className="chart wide">
            <h3>Trainer Breakdown</h3>
            <canvas id="trainerBreakdownChart" ref={trainerBreakdownChartRef}></canvas>
          </div>
        </div>
      </main>
    </div>
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-logo">
        <img src="/Users/hardikshah/50.003-resource-management-application/frontend-service/react-res-management-app/public/logo192.png" alt="Logo" />
      </div>
      <div className="footer-details">
        <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
        <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
        <p>1672 345 0987</p>
        <p>1672 345 0987</p>
        <p>info@company.io</p>
      </div>
      <div className="footer-social">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2023 Company. All rights reserved.</p>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Cookies Settings</a>
    </div>
  </footer>
    </>
    
  );
}

export default AdminDashboard;
