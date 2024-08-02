import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./test-home.css";
import dellLogo from "./assets/dell-logo.png";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input, Tag } from "antd";

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
      span: 26,
    },
    sm: {
      span: 16,
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
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="background">
      <div className="dark-overlay">
        <div className="signin-container">
          <img src={dellLogo} alt="Dell Technologies" className="logo" />
          <Form
            name="basic"
            {...formItemLayout}
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
              <Input />
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
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
              <Input />
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
              <Input.Password />
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
