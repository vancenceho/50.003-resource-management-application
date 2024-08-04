import React, { useState, useEffect } from "react";
import "./test-home.css";
import dellLogo from "./assets/dell-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Flex, Radio, notification } from "antd";
import axios from "axios";

function TestHome() {
  useEffect(() => {
    document.title = "Dell Resources | Login";
  }, []);

  const [form] = Form.useForm();
  const [userType, setUserType] = useState("b"); // a: admin, b: client, c: trainer
  const navigate = useNavigate();

  const onChange = (e) => {
    setUserType(e.target.value);
    console.log("radio checked", e.target.value);
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    let endpoint = "";
    switch (userType) {
      case "a":
        endpoint = "http://localhost:3000/admin/login";
        break;
      case "b":
        endpoint = "http://localhost:3000/client/login";
        break;
      case "c":
        endpoint = "http://localhost:3000/trainer/login";
        break;
      default:
        endpoint = "http://localhost:3000/client/login";
    }

    axios
      .post(endpoint, null, {
        params: { credential: values.username, password: values.password },
      })
      .then((response) => {
        // Handle successful login (e.g., redirect to the appropriate page based on the user type, store token, store user id, etc.)
        // Redirect to the appropriate page based on the user type
        console.log("Login successful: ", response);
        if (response.status === 200) {
          const { token, userId, username, role } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", role);

          if (userType === "a") {
            navigate("/admin-home");
          }
          if (userType === "b") {
            navigate("/client-home");
          }
          if (userType === "c") {
            navigate("/trainer-home");
          }
        }
      })
      .catch((error) => {
        // Handle login failure (e.g., display an error message)
        console.error("Login failed: ", error);

        // Bad request: Username or password was not provided
        if (error.response.status === 400) {
          // Display an error message
          console.error("Bad request: ", error.response.data);
        }

        // Validation Error: Username not found
        if (error.response.status === 404) {
          // Display an error message
          console.error("Not found: ", error.response.data);
          openNotificationWithIcon(
            "error",
            "Validation Error: 404",
            "Username not found. Please try again."
          );
          form.setFieldValue("username", "");
        }

        // Authentication Error: Password Incorrect
        if (error.response.status === 401) {
          // Display an error message
          console.error("Unauthorized: ", error.response.data);
          openNotificationWithIcon(
            "error",
            "Authentication Error: 401",
            "Password is incorrect. Please try again."
          );
          form.setFieldValue("password", "");
        }

        // Server Error: Internal server error
        if (error.response.status === 500) {
          // Display an error message
          console.error("Internal server error: ", error.response.data);
        }
      });
  };

  return (
    <div className="background">
      <div className="dark-overlay">
        <div className="signin-container">
          <img src={dellLogo} alt="Dell Technologies" className="logo" />
          <Flex
            direction="column"
            align="center"
            vertical
            gap="middle"
            className="selector"
          >
            <Radio.Group onChange={onChange} defaultValue="b">
              <Radio.Button value="a">Administrator</Radio.Button>
              <Radio.Button value="b">Client</Radio.Button>
              <Radio.Button value="c">Trainer</Radio.Button>
            </Radio.Group>
          </Flex>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="login-form"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 4, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 1 }}>
              <Button type="default" className="signup-button">
                <Link to="/test-signup">Create Account</Link>
              </Button>
              <Button type="primary" htmlType="submit" className="login-button">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default TestHome;
