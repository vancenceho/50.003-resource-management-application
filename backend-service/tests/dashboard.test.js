const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const Workshop = require('../models/workshopRequest'); 
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const mongoose = require('mongoose');

describe('Dashboard Management', () => {
    let adminToken;
    let trainer1Id, workshopId, workshopId2;

  beforeAll(async () => {
    // Connect to the test database
    await connectDB();
    const ids = await setDatabase();
    app = require("../app.js");
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString(); 
    workshopId2 = ids.workshopId2.toString(); 
  });

  afterAll(async () => {
    // Clean up the database and close the connection
    await clearDB();
    await cleanup();
  });

  describe('DT.1.0 getWorkshopsCountForTrainers', () => {
    it('should return the count of workshops for each trainer', async () => {
      const res = await request(app)
        .get(`/dashboard/workshopscount`)
        .query({ 
            startMonth: 'October 2023', 
            endMonth: 'November 2023' });

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        '66978299528ea72d01e2d310': 1,
        '66978299528ea72d01e2d312': 0,
      });
    });

    it('should return 400 if startMonth or endMonth is missing', async () => {
      const res = await request(app).get(`/dashboard/workshopscount`);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Start month and end month are required');
    });
  });

  describe('DT.2.0 getDealSizeTrend', () => {
    it('should return the deal size trend', async () => {
      const res = await request(app)
        .get('/dashboard/getdealsizetrend')
        .query({ startMonth: 'January 2023', endMonth: 'February 2023' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        code: 200,
        message: 'Deal size trend calculated',
        averageDealSize: 1500,
        totalRequests: 3,
        acceptedRequests: 0,
        pendingRequests: 3,
        completedRequests: 0,
        rejectedRequests: 0,
      });
    });

    it('should return 400 if startMonth or endMonth is missing', async () => {
      const response = await request(app).get(`/dashboard/getdealsizetrend`);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Start month and end month are required');
    });
  });

  describe('aggregateWorkshopsByStatus', () => {
    it('should aggregate workshops by status', async () => {
      const res = await request(app).get(`/dashboard/aggregateworkshopsbystatus`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { _id: 'Accepted', count: 0 },
        { _id: 'Pending', count: 3 },
        { _id: 'Rejected', count: 0 },
      ]);
    });
  });
});