const request = require('supertest');
//const Workshop = require('../models/workshopRequest'); 
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const admin = require("../models/admin.js");
const { app, dbConnectionPromise } = require("../app.js");

describe('Dashboard Management', () => {
    let adminToken;
    let trainer1Id, trainer2Id, workshopId, workshopId2;

  beforeAll(async () => {
    await dbConnectionPromise;
    const ids = await setDatabase();
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    trainer1Id = ids.trainerId.toString();
    trainer2Id = ids.trainerId2.toString();
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
        .get(`/admin/dashboard/workshopscount`)
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ 
            startMonth: 'October 2023', 
            endMonth: 'November 2023' });

      console.log('DT.1.0 Response Body:', res.body); // Add logging
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        '66978299528ea72d01e2d310': 1,
        '66978299528ea72d01e2d312': 0,
      });
    });

    it('should return 400 if startMonth or endMonth is missing', async () => {
      const res = await request(app)
      .get(`/admin/dashboard/workshopscount`)
      .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Start month and end month are required');
    });
  });

  describe('DT.2.0 getDealSizeTrend', () => {
    it('should return the deal size trend', async () => {
      const res = await request(app)
        .get('/admin/dashboard/getdealsizetrend')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ 
          startMonth: 'October 2023', 
          endMonth: 'November 2023' });

      expect(res.status).toBe(200);
      console.log('DT.2.0 Response Body:', res.body); // Add logging
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
      const response = await request(app)
      .get(`/admin/dashboard/getdealsizetrend`)
      .set('Authorization', `Bearer ${adminToken}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Start month and end month are required');
    });
  });

  describe('aggregateWorkshopsByStatus', () => {
    it('should aggregate workshops by status', async () => {
      const res = await request(app)
      .get(`/admin/dashboard/aggregateworkshopsbystatus`)
      .set('Authorization', `Bearer ${adminToken}`);

      console.log('DT.3.0 Response Body:', res.body); // Add logging
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { status: 'Accepted', count: 0 },
        { status: 'Rejected', count: 0 },
        { status: 'Pending', count: 3 },
        { status: 'Completed', count: 0 }
      ]);
    });
  });
});