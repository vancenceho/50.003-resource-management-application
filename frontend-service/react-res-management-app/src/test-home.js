import React, { useState } from "react";
import "./test-home.css";
import dellLogo from "./assets/dell-logo.png";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input, Flex, Radio } from "antd";
import axios from "axios";

const onChange = (e) => {
  console.log("radio checked", e.target.value);
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function TestHome() {
  const [userType, setUserType] = useState("b"); // a: admin, b: client, c: trainer

  const onChange = (e) => {
    setUserType(e.target.value);
    console.log("radio checked", e.target.value);
  };

  const onFinish = async (values) => {
    let endpoint = "";
    switch (userType) {
      case "a":
        endpoint = "http://localhost:5000/admin/login";
        break;
      case "b":
        endpoint = "http://localhost:5000/client/login";
        break;
      case "c":
        endpoint = "http://localhost:5000/trainer/login";
        break;
      default:
        endpoint = "http://localhost:5000/client/login";
    }

    try {
      const response = await axios.post(endpoint, {
        username: values.username,
        password: values.password,
      });
      console.log("Login successful: ", response);
      // Handle successful login (e.g., redirect to the appropriate page based on the user type, store token, store user id, etc.)
      // Redirect to the appropriate page based on the user type
    } catch (error) {
      console.error("Login failed: ", error);
      // Handle login failure (e.g., display an error message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
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
