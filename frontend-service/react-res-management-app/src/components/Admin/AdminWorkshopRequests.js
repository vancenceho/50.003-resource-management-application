import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./AdminWorkshopRequests.css";

import axios from "axios";

import NavBar from "./NavBar";
import Footer from "../../footer";
import {
  Button,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Cascader,
  Select,
  notification,
} from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const localizer = momentLocalizer(moment);
const { RangePicker } = DatePicker;

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

function AdminWorkshopRequests() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    document.title = "Dell Resources | Workshop Requests";
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getworkshop", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/gettrainer",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Trainers: ", response.data);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers: ", error);
      }
    };
    fetchTrainers();
  }, []);

  const showModal = (workshop) => {
    console.log("Selected Workshop: ", workshop);
    console.log("Selected Workshop Client: ", workshop.client.firstName);
    setSelectedWorkshop(workshop);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedWorkshop(null);
    setClientDetails(null);
  };

  const showEditModal = (record) => {
    setEditFormData(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      startDate: record.startDate,
      endDate: record.endDate,
      location: record.location,
      timeStart: record.timeStart,
      timeEnd: record.timeEnd,
      duration: record.duration,
      status: record.status,
      type: record.type,
      maxParticipants: record.maxParticipants,
      client: record.client,
      trainers: record.trainers,
      dealSize: record.dealSize,
    });
    console.log("Editing workshop: ", record);
    console.log("Edit form data: ", record.client);
    setIsEditModalVisible(true);
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleDateRangeChange = (dates) => {
    setEditFormData({
      ...editFormData,
      startDate: dates[0].toISOString(),
      endDate: dates[1].toISOString(),
    });
  };

  const handleEditFormSubmit = (record) => {
    console.log("Submitting edited workshop: ", editFormData);

    console.log("Edit form data before validation: ", editFormData);

    form.validateFields().then((values) => {
      console.log("Form values: ", values);
      console.log("Edit form data: ", editFormData);

      const updatedWorkshop = {
        _id: editFormData._id,
        name: values.name,
        description: values.description,
        startDate: editFormData.startDate,
        endDate: editFormData.endDate,
        location: values.location,
        timeStart: values.timeStart,
        timeEnd: values.timeEnd,
        duration: values.duration,
        status: Array.isArray(values.status) ? values.status[0] : values.status,
        type: Array.isArray(values.type) ? values.type[0] : values.type,
        maxParticipants: values.maxParticipants,
        client: values.client,
        trainers: values.trainers,
        dealSize: values.dealSize,
      };

      console.log("Updated workshop: ", updatedWorkshop._id);

      axios
        .put(
          `http://localhost:3000/admin/updateworkshop/${updatedWorkshop._id}`,
          updatedWorkshop,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Workshop updated: ", response);
          const updatedData = data.map((item) => {
            if (item._id === editFormData._id) {
              return { ...item, ...updatedWorkshop };
            }
            return item;
          });
          setData(updatedData);
          setIsEditModalVisible(false);
          setEditFormData({});
        })
        .catch((error) => {
          console.error("Error updating workshop: ", error);
          openNotificationWithIcon(
            "error",
            "Error Notification: 500",
            "Error updating workshop"
          );
        });
    });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditFormData({});
  };

  const onCascadeChange = (value) => {
    console.log("Cascader value: ", value);
  };

  const handleDelete = (workshop) => {
    console.log("Deleting workshop: ", workshop);
    axios
      .delete(`http://localhost:3000/admin/deleteworkshop/${workshop._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("Workshop deleted: ", response);
        // Remove the deleted workshop from the list
        setData(data.filter((item) => item._id !== workshop._id));
        setIsModalVisible(false);
        setSelectedWorkshop(null);
        setClientDetails(null);
      })
      .catch((error) => {
        console.error("Error deleting workshop: ", error);
      });
  };

  const columns = [
    {
      title: "Workshop Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Accepted",
          value: "Accepted",
        },
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => {
        let color = "";
        if (status === "Accepted") {
          color = "green";
        } else if (status === "Pending") {
          color = "yellow";
        } else {
          color = "red";
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="text"
            size="medium"
            icon={<MoreOutlined />}
            onClick={() => showModal(record)}
          ></Button>
          <Button
            type="text"
            size="medium"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          ></Button>
          <Button
            type="text"
            size="medium"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>

      <div className="admin-workshop-requests">
        <div className="content">
          <h1>Workshop Requests</h1>
          <Table
            columns={columns}
            dataSource={data}
            expandable={{
              expandableRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
          />
          <Modal
            title="Edit Workshop"
            visible={isEditModalVisible}
            onCancel={handleEditCancel}
            footer={[
              <Button key="back" onClick={handleEditCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={handleEditFormSubmit}
              >
                Update
              </Button>,
            ]}
          >
            <Form
              form={form}
              name="edit_workshop_form"
              initialValues={editFormData}
              onFinish={handleEditFormSubmit}
              onChange={handleEditFormChange}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item name="name" label="Workshop Name">
                <Input type="text" name="name" />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input type="text" name="description" />
              </Form.Item>
              <Form.Item
                name="dateRange"
                label="Date"
                initialValue={[
                  moment(editFormData.startDate),
                  moment(editFormData.endDate),
                ]}
              >
                <RangePicker onChange={handleDateRangeChange} />
              </Form.Item>
              <Form.Item name="location" label="Location">
                <Cascader
                  name="location"
                  options={["Local", "Overseas"].map((location) => ({
                    value: location,
                    label: location,
                  }))}
                  onChange={onCascadeChange}
                  placeholder="Select Location"
                />
              </Form.Item>
              <Form.Item name="time" label="Time">
                <TimePicker.RangePicker />
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Cascader
                  name="status"
                  options={["Pending", "Accepted", "Rejected"]
                    .sort()
                    .map((status) => ({ value: status, label: status }))}
                  onChange={onCascadeChange}
                  placeholder="Select Status"
                />
              </Form.Item>
              <Form.Item name="type" label="Type">
                <Cascader
                  name="type"
                  options={[
                    "Business Value Discovery",
                    "AI Platform",
                    "Infrastructure & Demo",
                  ].map((type) => ({ value: type, label: type }))}
                  onChange={onCascadeChange}
                  placeholder="Select Type"
                />
              </Form.Item>
              <Form.Item name="maxParticipants" label="Max Participants">
                <Cascader
                  name="maxParticipants"
                  options={["< 10", "10-20", "20-50", "> 50"].map(
                    (maxParticipants) => ({
                      value: maxParticipants,
                      label: maxParticipants,
                    })
                  )}
                  onChange={onCascadeChange}
                  placeholder="Select Max Participants"
                />
              </Form.Item>
              <Form.Item name="trainer" label="Trainers">
                <Select>
                  {trainers.map((trainer) => (
                    <Select.Option key={trainer._id} value={trainer._id}>
                      {trainer.firstName} {trainer.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="dealSize" label="Deal Size (SGD)">
                <Input type="text" name="dealSize" />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Workshop Details"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Close
              </Button>,
            ]}
          >
            <p>
              <strong>Name:</strong> {selectedWorkshop?.name}
            </p>
            <p>
              <strong>Client:</strong> {selectedWorkshop?.client.firstName}{" "}
            </p>
            <p>
              <strong>Type:</strong> {selectedWorkshop?.type}
            </p>
            <p>
              <strong>Location:</strong> {selectedWorkshop?.location}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedWorkshop?.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {selectedWorkshop?.endDate}
            </p>
            <p>
              <strong>Time Start:</strong> {selectedWorkshop?.timeStart}
            </p>
            <p>
              <strong>Time End:</strong> {selectedWorkshop?.timeEnd}
            </p>
            <p>
              <strong>Duration:</strong> {selectedWorkshop?.duration}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag
                color={
                  selectedWorkshop?.status === "pending"
                    ? "yellow"
                    : selectedWorkshop?.status === "accepted"
                    ? "green"
                    : "red"
                }
              >
                {selectedWorkshop?.status}
              </Tag>
            </p>
            <p>
              <strong>Max Participants:</strong>{" "}
              {selectedWorkshop?.maxParticipants}
            </p>
            <p>
              <strong>Description: </strong>
              <div>{selectedWorkshop?.description}</div>
            </p>
            <p>
              <strong>Trainers:</strong> {selectedWorkshop?.trainers}
            </p>
            <p>
              <strong>Deal Size:</strong> {selectedWorkshop?.dealSize}
            </p>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminWorkshopRequests;
