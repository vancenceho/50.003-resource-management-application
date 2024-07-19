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
          name: "Advanced Machine Learning Workshop",
          description: "Description 3",
          startDate: "23th July 2024",
          endDate: "26th July 2024",
          location: "Location 3",
          timeStart: "10:00 AM",
          timeEnd: "1:00 PM",
          duration: 3,
          status: "scheduled",
          type: "Technical",
          maxParticipants: 20,
          client: {
            "_id": "669785397e9a0985a34809ad",
            "username": "theClient",
            "firstName": "Lewis",
            "lastName": "Hamilton",
            "email": "lewis@example.com",
            "password": "12345",
            "role": "client"
          },
          trainer: {
            "_id": "6697855a7e9a0985a34809b0",
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
      expect(res.body.name).toBe("Advanced Machine Learning Workshop");
  });
  }); 
    
   describe("GET /admin/getworkshop", () => {
    it("should return all workshops", async () => {
      const res = await request(app)
      .get("/admin/getworkshop")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        id: randomWorkshopId });
      console.log('Workshops:', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });  //// works

   describe("GET /admin/getworkshop/:id", () => {
    it("should return a workshop", async () => {
      //const workshopId = '6695be7711e0918a004bfb93'; // This can be dynamically set
      const res = await request(app)
      .get(`/admin/getworkshop/:id`)
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        id: randomWorkshopId });

      console.log('Workshop :', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      // Add assertions here to validate the response
      expect(res.body).toHaveProperty('_id', randomWorkshopId);
      console.log('randomWorkshopId:', randomWorkshopId);
    });
  });  //// works
  
   describe("PUT /admin/updateworkshop/:id", () => {
    it("should update a product", async () => {
      //const workshopId = '6695be7711e0918a004bfb93'; // This can be dynamically set
      const res = await request(app)
      .put(`/admin/updateworkshop/:id`)
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        id: randomWorkshopId })
         .send({
            name: "Updated Advanced Machine Learning Workshop",
            description: "Updated Description",
            startDate: "23th July 2024",
            endDate: "26th July 2024",
            location: "Updated Location",
            timeStart: "10:00 AM",
            timeEnd: "1:00 PM",
            duration: 3,
            status: "Scheduled",
            type: "Non-Technical",
            maxParticipants: 25,
            client: {
              "_id": "668d5ba4a5f8eca9ff47283e",
              "username": "theClient",
              "firstName": "Lewis",
              "lastName": "Hamilton",
              "email": "lewis@example.com",
              "password": "12345",
              "role": "client"
            },
            trainer: {
              "_id": "668d5ba4a5f8eca9ff47283e",
              "username": "theTrainer",
              "firstName": "Sebastian",
              "lastName": "Vettel",
              "email": "sebastian@example.com",
              "password": "12345",
              "role": "trainer",
              "status": "available"
            }
        });
        console.log('updated Workshop:', res.body); // Print the workshops
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Updated Advanced Machine Learning Workshop");
    });
  });  
  
   describe("DELETE /admin/deleteworkshop", () => {
    it("should delete a product", async () => {
      const res = await request(app)
        .delete(`/admin/deleteworkshop/:id`)
        .set("Authorization", `Bearer ${adminToken}`)
        .query({
          id: randomWorkshopId });
        console.log('Deleted Workshop ID:', randomWorkshopId);
      expect(res.statusCode).toBe(200);
    });
  });



  
  
    /* Closing database connection after all test. */
     afterAll(async () => {
      cleanup();
    });

  });