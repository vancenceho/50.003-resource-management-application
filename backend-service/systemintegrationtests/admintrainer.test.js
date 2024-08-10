const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");
const { app, dbConnectionPromise } = require("../app.js");

describe("Testing Admin Trainer Endpoints", () => {
  let adminToken, trainerToken;
  let client1Id, trainer1Id, workshopId;

  /* Connecting to the database before all tests. */
  beforeAll(async () => {
    await dbConnectionPromise;
    const ids = await setDatabase();
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString(); 
    trainerToken = jwt.sign({ TrainerId: trainer1Id, role: "trainer" },  "root", { expiresIn: "1h" });
  });

 describe("ATT.1.0 - Admin Adds a New Trainer", () => {
    it("create trainer account", async () => {
      const res = await request(app)
      .post(`/admin/addtrainer`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        username: "trainer3",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        password: "12345",
        role: "trainer",
        status: "available"
      });
  
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe("Jane");
    });
  }); 
  
  
    describe("ATT.2.0 - Trainer login with credential (username or email)", () => {
    test("testing login with trainer account", async () => {
      const res = await request(app)
      .post(`/trainer/login`)
      //.set("Authorization", `Bearer ${trainerToken}`)
      .send({
        credential: "trainer1", // or "john@example.com" to test email login
          password: "12345"
      });
      console.log(res.body); // Log response body for debugging
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Authentication successful");
      expect(res.body).toHaveProperty('token');
    });
  }); 
  
  
  // ACT.3.0 - Admin Gets a Trainer by id
  describe("ATT.3.0 - Admin Gets a Trainer by ID", () => {
    test("should return a trainer", async () => {
      const res = await request(app)
      .get(`/admin/gettrainer/${trainer1Id}`)
      .set("Authorization", `Bearer ${adminToken}`)

      console.log('Trainer :', res.body); // Print the trainer
      expect(res.status).toBe(200);
      expect(res.body.username).toBe("trainer1");
      console.log('username:', 'trainer1');
    });
  }); 
  
  // ATT.4.0 - Admin Updates Trainer Information
  // - Admin Process (Approves/Rejects) Trainer Leave Request
  describe("ATT.4.0 - Admin Updates Trainer Information", () => {
    it("should update a trainer", async () => {
      const res = await request(app)
      .put(`/admin/updatetrainer/${trainer1Id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        username: "trainer4",
        firstName: "Mark",
        lastName: "Smith",
        email: "mark@example.com",
        password: "12345",
        role: "trainer",
        status: "available"

        });
        console.log('updated Trainer:', res.body); // Print the updated trainer
        expect(res.statusCode).toBe(200);
        expect(res.body.data.username).toBe("trainer4");
    });
  });  
  
  // ATT.5.0 - Admin Deletes a Trainer
  describe("ATT.5.0 - Admin Deletes a Trainer", () => {
    it("should delete a trainer", async () => {
      const res = await request(app)
      .delete(`/admin/deletetrainer/${trainer1Id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      console.log('Deleted Trainer ID:', 'trainer3');
      expect(res.statusCode).toBe(200);
    });
  });
  
  
  

    /* Closing database connection after all test. */
    afterAll(async () => {
      await clearDB();
      await cleanup();
    });

  });