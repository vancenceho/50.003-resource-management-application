import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Admin/AdminHome.css";
import { Button, Form, notification } from "antd";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/trainer/logout")
      .then((response) => {
        if (response.status === 200) {
          console.log("Trainer logged out successfully!");
          localStorage.clear();
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Button
            className="logout-button"
            type="text"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate("/trainer-home")}
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            className="logout-button"
            type="text"
            size="large"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
