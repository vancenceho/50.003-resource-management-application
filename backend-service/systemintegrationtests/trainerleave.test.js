
const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase.js");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin.js");
const { app, dbConnectionPromise } = require("../app.js");


describe("Testing Trainer to Leave Request Endpoints", () => {
    let adminToken, trainerToken;
    let client1Id, trainer1Id, leaveId;

  /* Connecting to the database before all test. */
  beforeAll(async () => {
    await dbConnectionPromise;
    const ids = await setDatabase();
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    trainerToken = jwt.sign({ TrainerId: ids.trainerId.toString(), role: "trainer" }, "root", { expiresIn: "1h" });
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    leaveId = ids.leaveId.toString();
  });

// TLT.1.0 - Trainer Creates A Leave Request
describe(" TWT.1.0 - Trainer Creates A Leave Request ", () => {
  it("should create a leave request", async () => {
    const res = await request(app)
    .post(`/trainer/submitleave/:trainerId`)
    .set("Authorization", `Bearer ${trainerToken}`)
    .send({
      // Leave details
        trainer: trainer1Id,
        startDate: '1st August 2023',
        endDate: '5th August 2023',
        duration: 10,
        status: 'Pending',
        type: 'Annual',
        reason: 'Vacation'
      });
    console.log('Leave Request created by Trainer :', res.body); // Print the workshops      
    expect(res.statusCode).toBe(200);
    //expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body.reason).toBe("Vacation");
});
}); 

// TWT.2.0 - Trainer Views His/Her Leave Requests
describe(" TWT.2.0 - Trainer Views His/Her Leave Requests ", () => {
  it("should show trainer's own leave request", async () => {
    const res = await request(app)
    .get(`/trainer/getleave/:trainerId`)
    .set("Authorization", `Bearer ${trainerToken}`)
    .query({ 
      trainer: trainer1Id
    });
    console.log('Leave Requests that Trainer has:', res.body); // Print the workshops      
    expect(res.statusCode).toBe(200);
    res.body.forEach(leave => {
      expect(leave).toHaveProperty('_id');
      expect(leave).toHaveProperty('trainer', trainer1Id);
      expect(leave).toHaveProperty('startDate');
      expect(leave).toHaveProperty('endDate');
      expect(leave).toHaveProperty('duration');
      expect(leave).toHaveProperty('status');
      expect(leave).toHaveProperty('type');
      expect(leave).toHaveProperty('reason');
    });
});
}); 

// TLT.3.0 - Trainer Updates Leave Request
describe("TLT.3.0 - Trainer Updates Leave Request", () => {
  it("should update a trainer's leave request", async () => {
    const res = await request(app)
    .put(`/trainer/updateleave/${leaveId}`)
    .set("Authorization", `Bearer ${trainerToken}`)
    .send({
      trainer: trainer1Id,
      startDate: '3st August 2023',
      endDate: '5th August 2023',
      duration: 10,
      status: 'Pending',
      type: 'Annual',
      reason: 'Family Emergency'
  });
      console.log('updated Leave Request:', res.body); // Print the workshops
      expect(res.body.code).toBe(200);
      expect(res.body.leaveRequest.reason).toBe("Family Emergency");
  });
});  

// TLT.4.0 - Trainer Delete Leave Request
describe("TLT.4.0 - Trainer Delete Leave Request", () => {
  it("should delete a leave request", async () => {
    const res = await request(app)
      .delete(`/trainer/deleteleave/${leaveId}`)
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(res.body.code).toBe(200);
  });
});

  /* Closing database connection after all test. */
  afterAll(async () => {
    await clearDB();
    await cleanup();
    });

  });