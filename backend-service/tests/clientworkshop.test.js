const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");


 describe("Testing Client to Workshop Endpoints", () => {
    let randomWorkshopId; 
    let randomClientId; 
    let clientToken;
     
  /* Connecting to the database before all test. */
  beforeAll(async () => {
    await connectDB();
    app = require("../app.js");

    // Fetch all clients
    const clientsRes = await request(app)
    .get("/client/getClients") // Adjust the endpoint as necessary
    const clients = clientsRes.body;
    // Select a random client ID
    randomClientId = clients[Math.floor(Math.random() * clients.length)]._id;
    clientToken = jwt.sign({ clientId: randomClientId, role: "client" }, "root", { expiresIn: "1h" });

    // Fetch all workshops
    const workshopsRes = await request(app)
    .get("/client/getworkshop")
    .set("Authorization", `Bearer ${clientToken}`);
    const workshops = workshopsRes.body;
    // Select a random workshop ID
    randomWorkshopId = workshops[Math.floor(Math.random() * workshops.length)]._id;

  });

// CWT.1.0 - Client Submits a Workshop Request
describe("CWT.1.0 - Client Submits a Workshop Request", () => {
  it("should store a workshop", async () => {
    const res = await request(app)
    .post("/client/addworkshop")
    .set("Authorization", `Bearer ${clientToken}`)
    .send({
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
        "_id": randomClientId,
        "username": "theClient",
        "firstName": "Lewis",
        "lastName": "Hamilton",
        "email": "lewis@example.com",
        "password": "12345",
        "role": "client"
      },
      trainer: {
        "_id": "669bc1f8d3a1fa47b2556457",
        "username": "theTrainer",
        "firstName": "Sebastian",
        "lastName": "Vettel",
        "email": "sebastian@example.com",
        "password": "12345",
        "role": "trainer",
        "status": "available"
      }
  });
  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe("Data Science Bootcamp");
});
}); 



// CWT.2.0 - Client Views Workshop Status
describe("CWT.2.0 - Client Views Workshop Status", () => {
    it("should return a workshop", async () => {
      const res = await request(app)
      .get(`/client/getworkshop/:id`)
      .set("Authorization", `Bearer ${clientToken}`)
      .query({
        id: randomWorkshopId });

      console.log('Client viewing Workshop :', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      // Add assertions here to validate the response
      expect(res.body).toHaveProperty('_id', randomWorkshopId);
      console.log('randomWorkshopId:', randomWorkshopId);
    });
  }); 
  





    /* Closing database connection after all test. */
    afterAll(async () => {
        cleanup();
      });
  
    });