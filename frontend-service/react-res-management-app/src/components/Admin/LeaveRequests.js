import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./LeaveRequests.css";

import NavBar from "./NavBar";
import Footer from "../../footer";

import axios from "axios";
import { Table, Tag } from "antd";

function LeaveRequests() {
  const [data, setData] = useState([]);
  const [trainers, setTrainers] = useState([]);

  // Setting the title page
  useEffect(() => {
    document.title = "Dell Resources | Leave Requests";
  }, []);

  // Fetching leave requests
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getleave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Leave Requests: ", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leave requests: ", error);
      });
  }, []);

  // Fetching trainers for leave requests
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/gettrainer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTrainers(response.data);
        console.log("Trainers: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching trainers: ", error);
      });
  }, []);

  const getTrainerDetails = (trainerId) => {
    const trainer = trainers.find((trainer) => trainer._id === trainerId);
    return trainer;
  };

  const columns = [
    {
      title: "Trainer ID",
      dataIndex: "trainer",
      key: "trainer",
      render: (trainer) => {
        const trainerDetails = getTrainerDetails(trainer);
        return trainerDetails ? trainerDetails._id : "Unknown";
      },
    },
    {
      title: "Trainer Name",
      dataIndex: "trainer",
      key: "trainerName",
      render: (trainer) => {
        const trainerDetails = getTrainerDetails(trainer);
        return trainerDetails ? trainerDetails.firstName : "Unknown";
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        // colors : magenta, red, volcano, orange, gold, lime, green, cyan, blue, geekblue, purple
        // types: annual, medical, emergency, childcare, maternity, paternity, unpaid, compassionate
        let color = "teal";
        if (type === "annual") {
          color = "purple";
        }
        if (type === "medical") {
          color = "volcano";
        }
        if (type === "emergency") {
          color = "red";
        }
        if (type === "childcare") {
          color = "orange";
        }
        if (type === "maternity") {
          color = "magenta";
        }
        if (type === "paternity") {
          color = "geekblue";
        }
        if (type === "unpaid") {
          color = "geekblue";
        }
        if (type === "compassionate") {
          color = "green";
        }

        return (
          <Tag color={color} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gold";
        if (status === "approved") {
          color = "green";
        } else if (status === "rejected") {
          color = "red";
        }

        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
  ];

  return (
    <>
      <div className="leave-requests">
        <NavBar />
        <div className="leave-requests-content">
          <h1>Leave Requests</h1>
          <div className="leave-requests-table"></div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LeaveRequests;
