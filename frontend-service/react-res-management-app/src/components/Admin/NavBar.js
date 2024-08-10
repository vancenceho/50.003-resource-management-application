import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminHome.css";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import {
  PlusOutlined,
  LogoutOutlined,
  HomeOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const NavBar = (onUserCreated) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("client"); // admin, trainer, client
  console.log("Role: ", role);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (value) => {
    setRole(value);
    console.log(`selected ${value}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/admin/logout")
      .then((response) => {
        if (response.status === 200) {
          console.log("Admin logged out successfully!");
          localStorage.clear();
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleCreateUser = async (values) => {
    let endpoint = "";
    switch (role) {
      case "admin":
        endpoint = "http://localhost:3000/admin/createAdmin";
        break;
      case "trainer":
        endpoint = "http://localhost:3000/admin/addtrainer";
        break;
      case "client":
        endpoint = "http://localhost:3000/admin/addclient";
        break;
      default:
        endpoint = "http://localhost:3000/admin/addclient";
    }

    const payload = {
      username: form.getFieldValue("username"),
      password: form.getFieldValue("password"),
      firstName: form.getFieldValue("firstName"),
      lastName: form.getFieldValue("lastName"),
      email: form.getFieldValue("email"),
      role: role,
    };

    console.log("Payload: ", payload);

    const token = localStorage.getItem("token");
    console.log("endpoint: " + endpoint);

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response: ", response);

      if (response.status === 200) {
        openNotificationWithIcon(
          "success",
          "User created successfully!",
          "User has been created successfully."
        );
        form.resetFields();
        onClose();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);

      if (error.response.status === 400) {
        openNotificationWithIcon(
          "error",
          "Error Notification: Bad request!",
          "400: Bad request. Please check that all fields are filled and try again."
        );
      }

      if (error.response.status === 401) {
        openNotificationWithIcon(
          "error",
          "Error Notification: Unauthorized!",
          "401: Unauthorized. Please login and try again."
        );
      }

      if (error.response.status === 403) {
        openNotificationWithIcon(
          "error",
          "Error Notification: Forbidden!",
          "403: Forbidden. You do not have permission to access this resource."
        );
      }

      if (error.response.status === 404) {
        openNotificationWithIcon(
          "error",
          "Error Notification: Not Found!",
          "404: Not Found. Please check that the endpoint is correct."
        );
      }

      if (error.response.status === 409) {
        openNotificationWithIcon(
          "error",
          "Error Notification: Validation Error!",
          "409: Conflict. The username or email already exists. Please try again."
        );
      }

      if (error.response.status === 500) {
        openNotificationWithIcon(
          "error",
          "Error Notification: Internal Server Error!",
          "500: Internal Server Error. Please try again later."
        );
      }
    }
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
            onClick={() => navigate("/admin-home")}
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            className="logout-button"
            type="text"
            size="large"
            icon={<BarChartOutlined />}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        </li>
        <li>
          <Button
            className="logout-button"
            type="text"
            size="large"
            icon={<UserOutlined />}
            onClick={() => navigate("/trainers")}
          >
            Trainers
          </Button>
        </li>
        <li>
          <Button
            className="logout-button"
            type="text"
            size="large"
            icon={<UserOutlined />}
          >
            Clients
          </Button>
        </li>
        <li>
          <Button
            className="logout-button"
            type="text"
            size="large"
            onClick={showDrawer}
            icon={<PlusOutlined />}
          >
            New User
          </Button>
          <Drawer
            title="Create A New User"
            width={720}
            onClose={onClose}
            open={open}
            styles={{
              body: {
                paddingBottom: 80,
              },
            }}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  onClick={handleCreateUser}
                  type="primary"
                  htmlType="submit"
                >
                  Create
                </Button>
              </Space>
            }
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              hideRequiredMark
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter username",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter username" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter password",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Please enter password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter first name!",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter first name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                      {
                        required: false,
                        message: "Please enter phone",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please enter email",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the role",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Please choose the role"
                      onChange={onChange}
                      defaultValue="client"
                    >
                      <Option value="admin">Admin</Option>
                      <Option value="trainer">Trainer</Option>
                      <Option value="client">Client</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
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
