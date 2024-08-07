import React from "react";
import "./footer.css";
import footerLogo from "./assets/icons8-dell-50-white.png";
import { GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={footerLogo} alt="Dell Technologies Logo" />
        </div>
        <div className="footer-details">
          <p>DELL TECHNOLOGIES</p>
          <p>
            Changi Business Park Central 1, Level 01 & 08 One @ Changi City,
            Singapore 486036
          </p>
        </div>
        <div className="footer-contributions">
          <hr></hr>
          <p>50.003 Elements of Software Construction</p>
          <p>
            {" "}
            TEAM 4 -{" "}
            <Button
              type="primary"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/vancenceho")}
            >
              Vancence Ho
            </Button>{" "}
            |{" "}
            <Button
              type="primary"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/rouzhen")}
            >
              {" "}
              Koo Rou Zhen{" "}
            </Button>{" "}
            |{" "}
            <Button
              type="primary"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/meghapusti")}
            >
              {" "}
              Megha Pusti{" "}
            </Button>{" "}
            |{" "}
            <Button
              type="primary"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/hetavi4")}
            >
              {" "}
              Hetavi Shah{" "}
            </Button>{" "}
            |{" "}
            <Button
              type="primary"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/Swasarya7")}
            >
              {" "}
              Swasti Arya
            </Button>
            |{" "}
            <Button
              type="primary"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/Shrinidhi098")}
            >
              Shrinidhi{" "}
            </Button>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Copyright © 2024 - Dell Technologies Request Resource Management Web
          Application
          <Button
            type="link"
            href="https://github.com/vancenceho/50.003-resource-management-application"
            target="_blank"
            icon={<GithubOutlined />}
          />
        </p>
      </div>
    </div>
  );
};

export default Footer;
