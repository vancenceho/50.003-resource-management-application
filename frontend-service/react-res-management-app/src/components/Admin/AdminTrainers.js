import React, { useState, useEffect } from "react";
import {
  Col,
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  notification,
  Modal,
  Form,
  Input,
  Dropdown,
  Menu,
} from "antd";
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./AdminHome.css";
import NavBar from "./NavBar";
import Footer from "../../footer";
import axios from "axios";
import bcrypt from "bcryptjs";

const { Column, ColumnGroup } = Table;

const AdminTrainers = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [status, setStatus] = useState("");

  const trainerStatus = ["available", "unavailable", "onLeave", "onWorkshop"];

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    document.title = "Dell Resources | Trainers";

    // Fetch trainers from the backend
    axios
      .get("http://localhost:3000/admin/gettrainer", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trainers: ", error);
      });
  }, []);

  const showEditModal = (record) => {
    setEditFormData(record);
    form.setFieldsValue({
      username: record.username,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      password: "",
      role: record.role,
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (!values.password) {
          openNotificationWithIcon(
            "error",
            "Password required",
            "Please enter a password"
          );
          return;
        }

        values.password = bcrypt.hashSync(values.password, 10);

        const updatedTrainer = {
          _id: editFormData._id,
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: editFormData.role,
          status: status,
        };

        console.log("DEBUGGING: ", updatedTrainer); // DEBUGGING
        axios
          .put(
            `http://localhost:3000/admin/updatetrainer/${updatedTrainer._id}`,
            updatedTrainer,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            openNotificationWithIcon(
              "success",
              "Trainer updated successfully",
              "200: Trainer has been successfully updated"
            );
            console.log("Trainer updated successfully: ", response);
            setData(
              data.map((trainer) =>
                trainer._id === updatedTrainer._id ? updatedTrainer : trainer
              )
            );
          })
          .catch((error) => {
            if (error.response) {
              console.error("Response data: ", error.response.data);
              console.error("Response status: ", error.response.status);
              console.error("Response headers: ", error.response.headers);
            } else if (error.request) {
              console.error("Request: ", error.request);
            } else {
              console.error("Error: ", error.message);
            }
            openNotificationWithIcon(
              "error",
              "Update Failed",
              "500: Internal Server Error. An error occurred while updating the trainer."
            );
          });

        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation failed: ", error);
        openNotificationWithIcon(
          "error",
          "Error Notification: Validation Error",
          "404: Please enter your passsword as well."
        );
      });
  };

  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:3000/admin/deletetrainer/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        openNotificationWithIcon(
          "success",
          "Trainer deleted successfully",
          "200: Trainer has been successfully deleted"
        );
        console.log("Trainer deleted successfully: ", response);
        setData(data.filter((trainer) => trainer._id !== id));
      })
      .catch((error) => {
        if (error.response) {
          console.error("Response data: ", error.response.data);
          console.error("Response status: ", error.response.status);
          console.error("Response headers: ", error.response.headers);
        } else if (error.request) {
          console.error("Request: ", error.request);
        } else {
          console.error("Error: ", error.message);
        }
      });
  };

  const handleMenuClick = (e) => {
    setStatus(e.key);
    console.log("Clicked on: ", e.key);
  };

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
      <div className="container">
        <Col span={24}>
          <h1>Trainers</h1>
        </Col>
      </div>
      <Table dataSource={data}>
        <Column title="Username" dataIndex="username" key="username" />
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Password" dataIndex="password" key="password" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => {
            if (status === "available") {
              return <Tag color="green">AVAILABLE</Tag>;
            }
            if (status === "unavailable") {
              return <Tag color="red">UNAVAILABLE</Tag>;
            }
            if (status === "onLeave") {
              return <Tag color="volcano">ON LEAVE</Tag>;
            }
            if (status === "onWorkshop") {
              return <Tag color="blue">ON WORKSHOP</Tag>;
            }
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this trainer?"
                description="This action cannot be undone."
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => handleDelete(record._id)}
              >
                <Button icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Edit Trainer"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="edit_trainer_form">
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            tooltip={{ title: "Must be unique!", icon: <InfoCircleOutlined /> }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message: "Please enter a valid first name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            tooltip={{
              title: "Must be a valid email",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Input disabled />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Dropdown
              overlay={
                <Menu onClick={handleMenuClick}>
                  {trainerStatus.map((status) => (
                    <Menu.Item key={status}>{status}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <Button>{status || "Select Status"}</Button>
            </Dropdown>
          </Form.Item>
        </Form>
      </Modal>
      <Footer />
    </>
  );
};

export default AdminTrainers;
