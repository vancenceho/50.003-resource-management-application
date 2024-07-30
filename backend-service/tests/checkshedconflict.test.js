const request = require('supertest');
const app = require('../app'); // Ensure this points to your Express app
const mongoose = require('mongoose');
const Workshop = require('../models/workshopRequest');
const Trainer = require('../models/trainer');
const Client = require('../models/client');

// Mock Mongoose Models
jest.mock('../models/workshopRequest');
jest.mock('../models/trainer');

// Mock Data
const workshopId = '66978299528ea72d01e2d311';
const workshopId3 = '66978299528ea72d01e2d314';
const trainerId = '66978299528ea72d01e2d310';
const trainerId2 = '66978299528ea72d01e2d312';
const clientId = '66978299528ea72d01e2d309';

const mockWorkshop = [
    {
    _id: workshopId3,
    name: "Effective Communication Skills",
    description: "Enhance your communication skills with practical tips and interactive exercises.",
    startDate: "10th October 2023",
    endDate: "12th October 2023",
    location: "New York Office",
    timeStart: "9:30 AM",
    timeEnd: "3:30 PM",
    duration: 2,
    status: "Scheduled",
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
        []
    },

    {
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
    }
    }



]
const mockTrainers = [
  {
    _id: trainerId,
    username: 'trainer1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    role: 'trainer'
  },
  {
    _id: trainerId2,
    username: 'trainer2',
    firstName: 'Natalie',
    lastName: 'Agus',
    email: 'nat@example.com',
    password: 'hashedPassword',
    role: 'trainer'
  }
];

describe('Check for Schedule Conflict', () => {
  beforeAll(async () => {
    // Setup necessary initial data or connections
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Cleanup any connections or data
    await mongoose.connection.close();
  });

  it('should return available trainers', async () => {
    Workshop.findById.mockResolvedValue(mockWorkshops[1]);
    Trainer.find.mockResolvedValue(mockTrainers);
    Workshop.find.mockResolvedValue([mockWorkshops[0]]); // Trainer 1 is assigned to a workshop during the same period

    const res = await request(app)
      .get(`/admin/checktraineravailability/:id`)
      .query({ workshopId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Available trainers found');
    expect(res.body.trainers).toHaveLength(1);
    expect(res.body.trainers[0]._id).toBe(trainerId2); // Only Natalie should be available
  });

  it('should return 400 if workshop ID is missing', async () => {
    const res = await request(app)
      .get(`/admin/checktraineravailability/:id`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Workshop ID are required');
  });

  it('should return 404 if workshop not found', async () => {
    Workshop.findById.mockResolvedValue(null);

    const res = await request(app)
      .get(`/admin/checktraineravailability/:id`)
      .query({ workshopId });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Requested workshop not found');
  });

  /*it('should return 409 if no available trainers', async () => {
    Workshop.findById.mockResolvedValue(mockWorkshop);
    Trainer.find.mockResolvedValue(mockTrainers);
    Workshop.find.mockResolvedValue([mockWorkshop]); // Trainers already assigned to another workshop

    const res = await request(app)
      .get(`/admin/checktraineravailability/:id`)
      .query({ workshopId });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('No available trainers found');
  });*/
});
