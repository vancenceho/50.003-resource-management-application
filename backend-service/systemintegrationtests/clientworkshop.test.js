const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");
const { app, dbConnectionPromise } = require("../app.js");

 describe("Testing Client to Workshop Endpoints", () => {
    let clientToken;
    let client1Id, trainer1Id, workshopId;
  /* Connecting to the database before all test. */
  beforeAll(async () => {
    await dbConnectionPromise;
    const ids = await setDatabase();
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString(); 
    clientToken = jwt.sign({ clientId: client1Id, role: "client" }, "root", { expiresIn: "1h" });

  });

// CWT.1.0 - Client Submits a Workshop Request
describe("CWT.1.0 - Client Submits a Workshop Request", () => {
  it("should store a workshop", async () => {
    const res = await request(app)
    .post("/client/addworkshop")
    .set("Authorization", `Bearer ${clientToken}`)
    .send({
      //Workshop Details:
      name: "Data Science Bootcamp",
      description: "An intensive bootcamp covering data science fundamentals and advanced topics.",
      startDate: "1st August 2024",
      endDate: "5th August 2024",
      location: "Tech Hub",
      timeStart: "9:00 AM",
      timeEnd: "5:00 PM",
      duration: 5,
      status: "Accepted",
      type: "Technical",
      maxParticipants: 20,
      client: {
        "_id": client1Id,
        "username": "client1",
        "firstName": "David",
        "lastName": "Ling",
        "email": "david@example.com",
        "password": "12345",
        "role": "client"
      },
      trainer: {
        "_id": trainer1Id,
        "username": "trainer1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "password": "12345",
        "role": "trainer",
        "status": "available"
      }
  });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("Data Science Bootcamp");
});
}); 



// CWT.2.0 - Client Views Workshop Status
describe("CWT.2.0 - Client Views Workshop Status", () => {
    it("should return a workshop", async () => {
      const res = await request(app)
      .get(`/client/getworkshop/${workshopId}`)
      .set("Authorization", `Bearer ${clientToken}`);

      console.log('Client viewing Workshop :', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', "66978299528ea72d01e2d311");
      console.log('WorkshopId:', "66978299528ea72d01e2d311");
    });
  }); 
  





    /* Closing database connection after all test. */
    afterAll(async () => {
      await clearDB();
        cleanup();
      });
  
    });