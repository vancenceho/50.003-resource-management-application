const request = require("supertest");
const mongoose = require("mongoose");
//const app = require("../app");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");


 describe("Testing Workshop Endpoints", () => {
    let randomWorkshopId; 
    const adminToken = jwt.sign({ AdminId: "66978299528ea72d01e2d308", role: "admin" }, "root", { expiresIn: "1h" });

  /* Connecting to the database before all test. */
  beforeAll(async () => {
      await connectDB();
      app = require("../app.js");
      // Fetch all workshops
      const res = await request(app).get("/admin/getworkshop").set("Authorization", `Bearer ${adminToken}`);
      const workshops = res.body;
      // Select a random workshop ID
      randomWorkshopId = workshops[Math.floor(Math.random() * workshops.length)]._id;
    });
  
    describe("POST /admin/addworkshop", () => {
      it("should create a workshop", async () => {
        const res = await request(app)
        .post("/admin/addworkshop")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Workshop 3",
          description: "Description 3",
          dateStart: "2023-01-01",
          dateEnd: "2023-01-02",
          location: "Location 3",
          duration: 3,
          status: "scheduled",
          type: "Technical",
          maxParticipants: 20,
          trainerId: "6331abc9e9ececcc2d449e55"
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Workshop 3");
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
      //const workshopId = '6695be7711e0918a004bfb93'; // This can be dynamically set
      const res = await request(app)
      .get(`/admin/getworkshop/:id?id=${randomWorkshopId}`)
      .set("Authorization", `Bearer ${adminToken}`);
      console.log('Workshop :', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      // Add assertions here to validate the response
      expect(res.body).toHaveProperty('_id', randomWorkshopId);
      console.log('randomWorkshopId:', randomWorkshopId);
    });
  });  //// works
  
  describe("PUT /admin/updateworkshop", () => {
    it("should update a product", async () => {
      //const workshopId = '6695be7711e0918a004bfb93'; // This can be dynamically set
      const res = await request(app)
      .put(`/admin/updateworkshop?id=${randomWorkshopId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
            name: "Workshop Updated",
            description: "Updated Description",
            startDate: "2023-02-01",
            endDate: "2023-02-02",
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
      //const workshopId = '6695be7711e0918a004bfb93'; // This can be dynamically set
      const res = await request(app)
        .delete(`/admin/deleteworkshop?id=${randomWorkshopId}`)
        .set("Authorization", `Bearer ${adminToken}`);
        console.log('deleted Workshop:');
      expect(res.statusCode).toBe(200);
    });
  });




  
    /* Closing database connection after all test. */
    afterAll(async () => {
      cleanup();
    });

  });