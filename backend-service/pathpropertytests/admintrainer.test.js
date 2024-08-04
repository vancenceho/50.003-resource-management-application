const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("../systemintegrationtests/setDatabase");
const jwt = require("jsonwebtoken");
const fc = require('fast-check');

describe("Fuzz Testing Admin Trainer Endpoints", () => {
  let adminToken, trainerToken;
  let client1Id, trainer1Id, workshopId;

  beforeAll(async () => {
    await connectDB();
    const ids = await setDatabase();
    app = require("../app.js");
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString();
    trainerToken = jwt.sign({ TrainerId: trainer1Id, role: "trainer" }, "root", { expiresIn: "1h" });
  });

  afterAll(async () => {
    await clearDB();
    await cleanup();
  });

  // Fuzz Test: Admin Adds a New Trainer
  describe("Fuzz Testing Admin Adds a New Trainer", () => {
    it("should handle various trainer inputs", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 30 }), // username
          fc.string({ minLength: 1, maxLength: 50 }), // firstName
          fc.string({ minLength: 1, maxLength: 50 }), // lastName
          fc.emailAddress(), // email
          fc.string({ minLength: 1, maxLength: 50 }), // password
          fc.constantFrom("trainer"), // role
          fc.constantFrom("available", "unavailable"), // status
          async (username, firstName, lastName, email, password, role, status) => {
            const res = await request(app)
              .post(`/admin/addtrainer`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send({
                username,
                firstName,
                lastName,
                email,
                password,
                role,
                status
              });

            // Check for appropriate responses (you can adjust expectations based on what your endpoint should return)
            expect(res.status).toBeOneOf([200, 400, 409]); // Adjust based on what is expected
          }
        )
      );
    });
  });

  // Fuzz Test: Trainer Login
  describe("Fuzz Testing Trainer Login", () => {
    it("should handle various login credentials", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 30 }), // credential (username or email)
          fc.string({ minLength: 1, maxLength: 50 }), // password
          async (credential, password) => {
            const res = await request(app)
              .post(`/trainer/login`)
              .send({
                credential,
                password
              });

            // Check for appropriate responses
            expect(res.statusCode).toBeOneOf([200, 400]); // Adjust based on what is expected
            if (res.statusCode === 200) {
              expect(res.body).toHaveProperty('token');
            }
          }
        )
      );
    });
  });

  // Fuzz Test: Admin Gets a Trainer by ID
  describe("Fuzz Testing Admin Gets a Trainer by ID", () => {
    it("should handle various trainer IDs", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 24, maxLength: 24 }), // Assuming MongoDB ObjectId length
          async (id) => {
            const res = await request(app)
              .get(`/admin/gettrainer/${id}`)
              .set("Authorization", `Bearer ${adminToken}`);

            // Check for appropriate responses
            expect(res.status).toBeOneOf([200, 404]); // Adjust based on what is expected
          }
        )
      );
    });
  });

  // Fuzz Test: Admin Updates Trainer Information
  describe("Fuzz Testing Admin Updates Trainer Information", () => {
    it("should handle various trainer update inputs", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 30 }), // username
          fc.string({ minLength: 1, maxLength: 50 }), // firstName
          fc.string({ minLength: 1, maxLength: 50 }), // lastName
          fc.emailAddress(), // email
          fc.string({ minLength: 1, maxLength: 50 }), // password
          fc.constantFrom("trainer"), // role
          fc.constantFrom("available", "unavailable"), // status
          async (username, firstName, lastName, email, password, role, status) => {
            const res = await request(app)
              .put(`/admin/updatetrainer/${trainer1Id}`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send({
                username,
                firstName,
                lastName,
                email,
                password,
                role,
                status
              });

            // Check for appropriate responses
            expect(res.statusCode).toBeOneOf([200, 400]); // Adjust based on what is expected
          }
        )
      );
    });
  });

  // Fuzz Test: Admin Deletes a Trainer
  describe("Fuzz Testing Admin Deletes a Trainer", () => {
    it("should handle various trainer IDs", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 24, maxLength: 24 }), // Assuming MongoDB ObjectId length
          async (id) => {
            const res = await request(app)
              .delete(`/admin/deletetrainer/${id}`)
              .set("Authorization", `Bearer ${adminToken}`);

            // Check for appropriate responses
            expect(res.statusCode).toBeOneOf([200, 404]); // Adjust based on what is expected
          }
        )
      );
    });
  });
});
