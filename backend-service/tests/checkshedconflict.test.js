const mongoose = require('mongoose');
const moment = require('moment');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const Workshop = require('../models/workshopRequest');
const Trainer = require('../models/trainer');

// Mock Mongoose models
jest.mock('../models/workshopRequest');
jest.mock('../models/trainer');

describe('checkforSchedConflict', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return 400 if workshopId is not provided', async () => {
    req.query.workshopId = undefined;

    await checkforSchedConflict(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Workshop ID are required" });
  });

  it('should return 404 if requested workshop is not found', async () => {
    req.query.workshopId = mongoose.Types.ObjectId();

    Workshop.findById.mockResolvedValue(null);

    await checkforSchedConflict(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Requested workshop not found" });
  });

  it('should return 400 if date format is invalid', async () => {
    req.query.workshopId = mongoose.Types.ObjectId();
    const invalidWorkshop = { startDate: 'invalid-date', endDate: 'invalid-date' };

    Workshop.findById.mockResolvedValue(invalidWorkshop);

    await checkforSchedConflict(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid date format" });
  });

  it('should return 409 if no available trainers are found', async () => {
    req.query.workshopId = mongoose.Types.ObjectId();
    const validWorkshop = { startDate: '1st July 2024', endDate: '5th July 2024' };

    Workshop.findById.mockResolvedValue(validWorkshop);

    Trainer.find.mockResolvedValue([{ _id: mongoose.Types.ObjectId(), username: 'trainer1' }]);

    const workshopsAllocToTR = [
      { startDate: '2nd July 2024', endDate: '4th July 2024', trainer: mongoose.Types.ObjectId() }
    ];

    Workshop.find.mockResolvedValue(workshopsAllocToTR);

    await checkforSchedConflict(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "No available trainers found" });
  });

  it('should return available trainers if no conflicts are found', async () => {
    req.query.workshopId = mongoose.Types.ObjectId();
    const validWorkshop = { startDate: '1st July 2024', endDate: '5th July 2024' };

    Workshop.findById.mockResolvedValue(validWorkshop);

    const trainer1 = { _id: mongoose.Types.ObjectId(), username: 'trainer1' };
    Trainer.find.mockResolvedValue([trainer1]);

    Workshop.find.mockResolvedValue([]);

    await checkforSchedConflict(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Available trainers found", trainers: [trainer1] });
  });

  it('should return 500 if an error occurs', async () => {
    req.query.workshopId = mongoose.Types.ObjectId();

    Workshop.findById.mockRejectedValue(new Error('Database error'));

    await checkforSchedConflict(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
