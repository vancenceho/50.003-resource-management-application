import React, { useState, useEffect } from "react";
import axios from "axios";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./test-home.css";
import dellLogo from "./assets/dell-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, notification, Space } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 26,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 8,
      offset: 1,
    },
    sm: {
      span: 24,
      offset: 1,
    },
  },
};

// username, firstName, lastName, email, password

function TestSignUp() {
  useEffect(() => {
    document.title = "Dell Resources | Sign Up";
  }, []);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onFinish = (values) => {
    if (
      !values.username ||
      !values.firstName ||
      !values.email ||
      !values.password
    ) {
      console.log(values.username);
      console.log(values.firstName);
      console.log(values.email);
      console.log(values.password);

      console.log("Sending request with values: ", values);
      return;
    }

    // Send a POST request using axios to the server
    axios
      .post(
        "http://localhost:3000/client/createClient",
        {
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: "client",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Client created successfully!");
          form.resetFields();
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("Bad request! Please check your input values.!");
            console.log("Error Response: ", error.response.data);
          }

          if (error.response.status === 409) {
            console.log("Client already exists!");
            console.log("Error Response: ", error.response.data);
            openNotificationWithIcon(
              "error",
              "Validation Error Notification: 409",
              "Client Username already exists. Please try again with a different username."
            );
            form.setFieldsValue({ username: "" });
          }

          if (error.response.status === 500) {
            console.log("Internal server error! Please try again later.");
            console.log("Error Response: ", error.response.data);
          }
        } else if (error.request) {
          console.log("Error response request: ", error.request);
        } else {
          console.log("Error message: ", error.message);
        }
      });
  };

  return (
    <div className="background">
      <div className="dark-overlay">
        <div className="signin-container">
          <img src={dellLogo} alt="Dell Technologies" className="logo" />
          <Form
            form={form}
            name="basic"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            className="signup-form"
          >
            <Form.Item
              label="Username"
              name="username"
              tooltip={{
                title: "What do you want others to call you?",
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: false,
                  message: "Please input your last name!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              tooltip={{
                title: "Must be a valid email address",
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                  whitespace: true,
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="unqiue1234" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                  whitespace: true,
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I agree that all above information is accurate
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" className="cancel-button">
                <Link to="/">Back</Link>
              </Button>
              <Button type="primary" htmlType="submit" className="login-button">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default TestSignUp;
