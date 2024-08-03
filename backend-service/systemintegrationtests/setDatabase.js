const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const Client = require("../models/client");
const Trainer = require("../models/trainer");
const Workshop = require("../models/workshopRequest");
const LeaveRequest = require("../models/leaveRequest");

// Define fixed ObjectIds
const adminId = new mongoose.Types.ObjectId("66978299528ea72d01e2d308");
const clientId = new mongoose.Types.ObjectId("66978299528ea72d01e2d309");
const trainerId = new mongoose.Types.ObjectId("66978299528ea72d01e2d310");
const trainerId2 = new mongoose.Types.ObjectId("66978299528ea72d01e2d312");
const workshopId = new mongoose.Types.ObjectId("66978299528ea72d01e2d311");
const workshopId2 = new mongoose.Types.ObjectId("66978299528ea72d01e2d313");
const workshopId3 = new mongoose.Types.ObjectId("66978299528ea72d01e2d314");
const leaveId = new mongoose.Types.ObjectId("66978299528ea72d01e2d315");

// Function to hash passwords
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const setDatabase = async () => {
  console.log('Inserting initial data...');

  const hashedAdminPassword = await hashPassword("12345");
  const hashedClientPassword = await hashPassword("12345");
  const hashedTrainerPassword = await hashPassword("12345");

  await Admin.create({
    _id: adminId,
    username: "admin1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: hashedAdminPassword,
    role: "admin"
  });

  await Client.create({
    _id: clientId,
    username: "client1",
    firstName: "David",
    lastName: "Ling",
    email: "david@example.com",
    password: hashedClientPassword,
    role: "client"
  });

  await Trainer.create({
    _id: trainerId,
    username: "trainer1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: hashedTrainerPassword,
    role: "trainer",
    status: "available"
  });

  await Trainer.create({
    _id: trainerId2,
    username: "trainer2",
    firstName: "Natalie",
    lastName: "Agus",
    email: "nat@example.com",
    password: hashedTrainerPassword,
    role: "trainer",
    status: "available"
  });

  await Workshop.create({
    _id: workshopId,
    name: "Advanced Node.js",
    description: "Dive deep into Node.js architecture and asynchronous programming",
    startDate: "10th October 2023",
    endDate: "12th October 2023",
    location: "Online",
    timeStart: "9:00 AM",
    timeEnd: "5:00 PM",
    duration: 2,
    status: "Pending",
    type: "Technical",
    maxParticipants: 20,
    client: {
      "_id": clientId,
      "username": "client1",
      "firstName": "David",
      "lastName": "Ling",
      "email": "david@example.com",
      "password": hashedClientPassword,
      "role": "client"
    },
    trainer: {
      "_id": trainerId,
      "username": "trainer1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "password": hashedTrainerPassword,
      "role": "trainer",
      "status": "available"
    },
    dealSize: 1000
  });

  
  await Workshop.create({
    _id: workshopId2,
    name: "Introduction to React",
    description: "Learn the basics of React, including components, state, and props",
    startDate: "5th November 2023",
    endDate: "7th November 2023",
    location: "Online",
    timeStart: "10:00 AM",
    timeEnd: "4:00 PM",
    duration: 2,
    status: "Pending",
    type: "Technical",
    maxParticipants: 25,
    client: {
      "_id": clientId,
      "username": "client1",
      "firstName": "David",
      "lastName": "Ling",
      "email": "david@example.com",
      "password": hashedClientPassword,
      "role": "client"
    },
    trainer: 
      [],
    dealSize: 1500
  });

  await Workshop.create({
    _id: workshopId3,
    name: "Effective Communication Skills",
    description: "Enhance your communication skills with practical tips and interactive exercises.",
    startDate: "10th October 2023",
    endDate: "12th October 2023",
    location: "New York Office",
    timeStart: "9:30 AM",
    timeEnd: "3:30 PM",
    duration: 2,
    status: "Pending",
    type: "Soft Skills",
    maxParticipants: 20,
    client: {
      "_id": clientId,
      "username": "client1",
      "firstName": "David",
      "lastName": "Ling",
      "email": "david@example.com",
      "password": hashedClientPassword,
      "role": "client"
    },
    trainer: 
      [],
    dealSize: 2000
  });

  await LeaveRequest.create({
    _id: leaveId,
    trainer: trainerId,
    startDate: '1st September 2023',
    endDate: '5th September 2023',
    duration: 10,
    status: 'Pending',
    type: 'Annual',
    reason: 'Medical leave'
  });

  return { adminId, clientId, trainerId, trainerId2, workshopId, workshopId2, workshopId3, leaveId };
};

module.exports = setDatabase;
