const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("../systemintegrationtests/setDatabase");
const jwt = require("jsonwebtoken");

describe("Testing Client to Workshop Endpoints with Fuzzing and MPCP", () => {
  let clientToken;
  let client1Id, trainer1Id, workshopId;

  beforeAll(async () => {
    await connectDB();
    const ids = await setDatabase();
    app = require("../app.js");
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString();
    clientToken = jwt.sign({ clientId: client1Id, role: "client" }, "root", { expiresIn: "1h" });
  });

// Fuzzing Test for CWT.1.0 - Client Submits a Workshop Request
describe("Fuzzing Test - Client Submits a Workshop Request", () => {
    it("should handle random data gracefully", async () => {
      const randomData = {
        name: Math.random().toString(36).substring(7),
        description: Math.random().toString(36).substring(7),
        startDate: "invalid-date",
        endDate: "invalid-date",
        location: Math.random().toString(36).substring(7),
        timeStart: "invalid-time",
        timeEnd: "invalid-time",
        duration: "invalid-duration",
        status: Math.random().toString(36).substring(7),
        type: Math.random().toString(36).substring(7),
        maxParticipants: "invalid-number",
        client: {
          "_id": "invalid-id",
          "username": Math.random().toString(36).substring(7),
          "firstName": Math.random().toString(36).substring(7),
          "lastName": Math.random().toString(36).substring(7),
          "email": "invalid-email",
          "password": Math.random().toString(36).substring(7),
          "role": Math.random().toString(36).substring(7)
        },
        trainer: {
          "_id": "invalid-id",
          "username": Math.random().toString(36).substring(7),
          "firstName": Math.random().toString(36).substring(7),
          "lastName": Math.random().toString(36).substring(7),
          "email": "invalid-email",
          "password": Math.random().toString(36).substring(7),
          "role": Math.random().toString(36).substring(7),
          "status": Math.random().toString(36).substring(7)
        }
      };
  
      const res = await request(app)
        .post("/client/addworkshop")
        .set("Authorization", `Bearer ${clientToken}`)
        .send(randomData);
  
      if (res.statusCode === 400) {
        expect(res.body.code).toBe(400);
        expect(res.body.type).toBe("client error");
        expect(res.body.message).toBe("Invalid input: name, startDate, and endDate are required");
      } else if (res.statusCode === 422) {
        expect(res.body.code).toBe(422);
        expect(res.body.type).toBe("validation error");
        expect(res.body.message).toBe("Validation exception");
      } else if (res.statusCode === 500) {
        expect(res.body.code).toBe(500);
        expect(res.body.type).toBe("server error");
        expect(res.body.message).toBe("Internal Server Error");
      } else {
        throw new Error(`Unexpected status code: ${res.statusCode}`);
      }
    });
  });

  // MPCP Test for CWT.2.0 - Client Views Workshop Status
  /*describe("MPCP Test - Client Views Workshop Status", () => {
    const testCases = [
      { workshopId: "66978299528ea72d01e2d311", expectedStatus: 200 },
      { workshopId: "invalid-id", expectedStatus: 500 },
      { workshopId: "", expectedStatus: 500 },
      { workshopId: null, expectedStatus: 500 }
    ];

    testCases.forEach(({ workshopId, expectedStatus }) => {
      it(`should return status ${expectedStatus} for workshopId: ${workshopId}`, async () => {
        const res = await request(app)
          .get(`/client/getworkshop/${workshopId}`)
          .set("Authorization", `Bearer ${clientToken}`);

        expect(res.statusCode).toBe(expectedStatus);
      });
    });
  });*/

  afterAll(async () => {
    await clearDB();
    cleanup();
  });
});