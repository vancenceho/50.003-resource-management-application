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

// CWT.1.0 - Client Views Workshop Status
describe("CWT.1.0 - Client Views Workshop Status", () => {
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