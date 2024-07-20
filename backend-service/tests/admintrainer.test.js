const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");

describe("Testing Admin Trainer Endpoints", () => {
    let randomTrainerId; 
    let trainerToken;
    const adminToken = jwt.sign({ AdminId: "66978299528ea72d01e2d308", role: "admin" }, "root", { expiresIn: "1h" });

    /* Connecting to the database before all test. */
    beforeAll(async () => {
        await connectDB();
        app = require("../app.js");
        // Fetch all trainers
        const res = await request(app)
        .get("/trainer/getTrainers")
        const trainers = res.body;
        // Select a random trainer ID
        randomTrainerId = trainers[Math.floor(Math.random() * trainers.length)]._id;
        trainerToken = jwt.sign({ TrainerId: randomTrainerId, role: "trainer" }, "root", { expiresIn: "1h" });
    });

    
 describe("ATT.1.0 - Admin Adds a New Trainer", () => {
    it("create trainer account", async () => {
      const res = await request(app)
      .post("/admin/addtrainer")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
          username: "trainer1",
          firstName: "john",
          lastName: "die",
          email: "johndoe@example.com",
          password: "12345",
          role: "trainer",
          status: "available"
      });
  
      expect.stringContaining("json");
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe("john");
    });
  }); 
  
  
    describe("ATT.2.0 - Trainer login with credential (username or email)", () => {
    test("testing login with client account", async () => {
      const res = await request(app)
      .get("/trainer/login")
      .set("Authorization", `Bearer ${trainerToken}`)
      .query({
        credential: "theTrainer", // or "sebastian@example.com" to test email login
          password: "12345"
      });
  
      expect(res.status).toBe(200);
      console.log(res.body);
    });
  }); 
  
  
  // ACT.3.0 - Admin Gets a Trainer by ID
  describe("ATT.3.0 - Admin Gets a Trainer by ID", () => {
    test("should return a trainer", async () => {
      const res = await request(app)
      .get("/admin/gettrainer/:id")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        id: randomTrainerId});
    
      console.log('Trainer :', res.body); // Print the workshops
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id', randomTrainerId);
      console.log('randomTrainerId:', randomTrainerId);
    });
  }); 
  
  // ATT.4.0 - Admin Updates Trainer Information
  // - Admin Process (Approves/Rejects) Trainer Leave Request
  describe("ATT.4.0 - Admin Updates Trainer Information", () => {
    it("should update a trainer", async () => {
      const res = await request(app)
      .put(`/admin/updatetrainer/:id`)
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        id: randomTrainerId
      })
      .send({
        username: "updatedtrainer1",
        firstName: "john",
        lastName: "die",
        //email: "johndoe@example.com",
        password: "12345",
        role: "trainer",
        status: "unavailable"

        });
        console.log('updated Trainer:', res.body); // Print the updated trainer
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("updatedtrainer1");
    });
  });  
  
  // ATT.5.0 - Admin Deletes a Trainer
  /*describe("ATT.5.0 - Admin Deletes a Trainer", () => {
    it("should delete a trainer", async () => {
      const res = await request(app)
      .delete(`/admin/deletetrainer/:id`)
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        id: randomTrainerId
      });
      console.log('Deleted Trainer ID:', randomTrainerId);
      expect(res.statusCode).toBe(200);
    });
  });
  */
  
  
      /* Closing database connection after all test. */
      afterAll(async () => {
        await cleanup();
      });
  
    });