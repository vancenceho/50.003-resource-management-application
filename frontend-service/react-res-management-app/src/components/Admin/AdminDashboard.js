import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import { Card, Col, Row, Statistic } from "antd";
import NavBar from "./NavBar";
import Footer from "../../footer";

import axios from "axios";

const AdminDashboard = () => {
  const dealSizesChartRef = useRef(null);
  const pipelineChartRef = useRef(null);
  const trainerBreakdownChartRef = useRef(null);

  // define constant for total requests
  const [totalRequests, setRequests] = useState(null); // total requests
  const [acceptedRequests, setAcceptedRequests] = useState(null); // accepted requests
  const [pendingRequests, setPendingRequests] = useState(null); // pending requests
  const [rejectedRequests, setRejectedRequests] = useState(null); // rejected requests

  // useEffect to get total workshop request data
  useEffect(() => {
    document.title = "Dell Resources | Admin Dashboard";

    // function to count total requests
    axios
      .get("http://localhost:3000/admin/getworkshop", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRequests(response.data.length);
        setAcceptedRequests(
          response.data.filter((req) => req.status === "accepted").length
        );
        setPendingRequests(
          response.data.filter((req) => req.status === "pending").length
        );
        setRejectedRequests(
          response.data.filter((req) => req.status === "rejected").length
        );
      });
  }, []);

  useEffect(() => {
    // Deal Sizes Chart
    const ctxDealSizes = dealSizesChartRef.current.getContext("2d");
    const dealSizesChart = new Chart(ctxDealSizes, {
      type: "line",
      data: {
        labels: [
          "5k",
          "10k",
          "15k",
          "20k",
          "25k",
          "30k",
          "35k",
          "40k",
          "45k",
          "50k",
          "55k",
          "60k",
        ],
        datasets: [
          {
            label: "Deal Size",
            data: [30, 50, 80, 60, 70, 50, 40, 60, 70, 90, 60, 70],
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Pipeline Breakdown Chart
    const ctxPipeline = pipelineChartRef.current.getContext("2d");
    const pipelineChart = new Chart(ctxPipeline, {
      type: "doughnut",
      data: {
        labels: ["Accepted", "Pending", "Rejected"],
        datasets: [
          {
            label: "Pipeline",
            data: [60, 30, 10],
            backgroundColor: [
              "rgba(0, 123, 255, 1)",
              "rgba(255, 193, 7, 1)",
              "rgba(220, 53, 69, 1)",
            ],
            borderWidth: 5,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Trainer Breakdown Chart
    const ctxTrainerBreakdown =
      trainerBreakdownChartRef.current.getContext("2d");
    const trainerBreakdownChart = new Chart(ctxTrainerBreakdown, {
      type: "bar",
      data: {
        labels: ["Trainer 1", "Trainer 2", "Trainer 3", "Trainer 4"],
        datasets: [
          {
            label: "Sessions",
            data: [40, 50, 70, 30],
            backgroundColor: [
              "rgba(0, 123, 255, 0.8)",
              "rgba(0, 123, 255, 0.6)",
              "rgba(0, 123, 255, 0.4)",
              "rgba(0, 123, 255, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
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
      <header className="App-header">
        <NavBar />
      </header>

      <div className="container">
        <main>
          <h1>DASHBOARD</h1>
          <div className="cards">
            <Row gutter={16}>
              <Col span={6}>
                <Card bordered={true} style={{ borderColor: "#0b57d0" }}>
                  <Statistic
                    title="Total Requests"
                    value={totalRequests}
                    valueStyle={{ color: "#0b57d0" }}
                    loading={false}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={true} style={{ borderColor: "#0b57d0" }}>
                  <Statistic
                    title="Accepted Requests"
                    value={acceptedRequests}
                    valueStyle={{ color: "#0b57d0" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={true} style={{ borderColor: "#0b57d0" }}>
                  <Statistic
                    title="Pending Requests"
                    value={pendingRequests}
                    valueStyle={{ color: "#0b57d0" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={true} style={{ borderColor: "#0b57d0" }}>
                  <Statistic
                    title="Rejected Requests"
                    value={rejectedRequests}
                    valueStyle={{ color: "#0b57d0" }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <div className="charts">
            <div className="chart wide">
              <h2>Workshop Deal Sizes</h2>
              <canvas
                data-testid="deal-sizes-chart"
                ref={dealSizesChartRef}
              ></canvas>
            </div>
            <div className="chart medium">
              <h2>Pipeline Breakdown</h2>
              <canvas
                data-testid="pipeline-chart"
                ref={pipelineChartRef}
              ></canvas>
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
              <canvas
                data-testid="trainer-breakdown-chart"
                ref={trainerBreakdownChartRef}
              ></canvas>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
