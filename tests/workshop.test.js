const request = require("supertest");
const mongoose = require("mongoose");
//const app = require("../app");
const { connectDB, cleanup } = require("../models/db.js");
const Workshop = require("../models/workshopRequest");
const jwt = require("jsonwebtoken");

/*// Sample workshop data
const sampleWorkshop = {
    _id: new mongoose.Types.ObjectId(),
    name: "Workshop 1",
    description: "Description 1",
    dateStart: new Date("2023-01-01"),
    dateEnd: new Date("2023-01-02"),
    location: "Location 1",
    duration: 2,
    status: "Scheduled",
    type: "Technical",
    maxParticipants: 20,
    trainerId: ["6331abc9e9ececcc2d449e55"]
  };
  */
 describe("Testing Workshop Endpoints", () => {
    //let app;
    const adminToken = jwt.sign({ AdminId: "668a6698f2e74ea82b18c120", role: "admin" }, "root", { expiresIn: "1h" });

  /* Connecting to the database before all test. */
  beforeAll(async () => {
      await connectDB();
      app = require("../app");
    });
  
    describe("POST /admin/addworkshop", () => {
      it("should create a workshop", async () => {
        const res = await request(app)
        .post("/admin/addworkshop")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Workshop 2",
          description: "Description 2",
          dateStart: "2023-01-01",
          dateEnd: "2023-01-02",
          location: "Location 2",
          duration: 2,
          status: "Scheduled",
          type: "Technical",
          maxParticipants: 20,
          trainerId: "6331abc9e9ececcc2d449e55"
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Workshop 2");
  });
  });  //// works
    
  describe("GET /admin/getworkshop", () => {
    it("should return all workshops", async () => {
      const res = await request(app)
      .get("/admin/getworkshop")
      .set("Authorization", `Bearer ${adminToken}`);
      console.log('Workshops:', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });  //// works

  describe("GET /admin/getworkshop/:id", () => {
    it("should return a workshop", async () => {
      const res = await request(app)
      .get(`/admin/getworkshop/:id?id=66947e982995c683f3a964e0`)
      .set("Authorization", `Bearer ${adminToken}`);
      console.log('Workshop :', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Workshop 2");
    });
  });  //// works
  
  describe("PUT /admin/updateworkshop", () => {
    it("should update a product", async () => {
      const res = await request(app)
      .put(`/admin/updateworkshop?id=66947e982995c683f3a964e0`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
            name: "Workshop Updated",
            description: "Updated Description",
            dateStart: "2023-02-01",
            dateEnd: "2023-02-02",
            location: "Updated Location",
            duration: 3,
            status: "Scheduled",
            type: "Non-Technical",
            maxParticipants: 25,
            trainerId: "6331abc9e9ececcc2d449e66"
        });
        console.log('updated Workshop:', res.body); // Print the workshops
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Workshop Updated");
    });
  });  //// works
  
  describe("DELETE /admin/deleteworkshop", () => {
    it("should delete a product", async () => {
      const res = await request(app)
        .delete(`/admin/deleteworkshop?id=66947e982995c683f3a964e0`)
        .set("Authorization", `Bearer ${adminToken}`);
        console.log('deleted Workshop:');
      expect(res.statusCode).toBe(200);
    });
  });

    /* Closing database connection after all test. */
    afterAll(async () => {
      await mongoose.connection.close();
    });

  });