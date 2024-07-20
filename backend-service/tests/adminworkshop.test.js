const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");


 describe("Testing Admin to Workshop Endpoints", () => {
    let randomWorkshopId, randomClientId;  
    const adminToken = jwt.sign({ AdminId: "66978299528ea72d01e2d308", role: "admin" }, "root", { expiresIn: "1h" });

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
     
      // Fetch all workshops
      const res = await request(app)
      .get("/admin/getworkshop")
      .set("Authorization", `Bearer ${adminToken}`);
      const workshops = res.body;
      // Select a random workshop ID
      randomWorkshopId = workshops[Math.floor(Math.random() * workshops.length)]._id;
    });
 

     describe("AWT.1.0 - Admin create Workshop Request", () => {
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
            "_id": randomClientId,
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
    

  describe("AWT.2.0 - Admin get Workshop Request", () => {
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
  });


   describe("AWT.3.0 - get Workshop Request by id", () => {
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
  });  

  
   describe("AWT.4.0 - Admin Edits Workshop Request", () => {
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
              "_id": randomClientId,
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
        console.log('updated Workshop:', res.body); // Print the workshops
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Updated Advanced Machine Learning Workshop");
    });
  });  
  

   describe("AWT.5.0 - Admin Deletes Workshop Request", () => {
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

    //AWT.6.0 - Admin Allocates Trainers to a Workshop, Admin Accepts/Reject Workshop Request
    //testing WorkshopManagement. allocateTrToWorkshop function

 /*   describe("AWT.6.0 - Admin Allocates Trainers to a Workshop, Admin Accepts/Reject Workshop Request", () => {
      it("should allocate trainers to a workshop", async () => {
        const res = await request(app)
        .post(`/admin/allocatetrainer`)
        .set("Authorization", `Bearer ${adminToken}`)
        .query({
          id: randomWorkshopId,  
          trainer : trainerIds
        });
        console.log('Accepted Workshop ID:', randomWorkshopId);
        expect(res.statusCode).toBe(200);
      });
    });
  */

  
  
    /* Closing database connection after all test. */
     afterAll(async () => {
      cleanup();
    });

  });