const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");
const { app, dbConnectionPromise } = require("../app.js");

 describe("Testing Admin to Workshop Endpoints", () => {
    let adminToken;
    let client1Id, trainer1Id, workshopId, workshopId2, workshopId3;

  /* Connecting to the database before all test. */
   beforeAll(async () => {
    // Insert initial data
    await dbConnectionPromise;
    const ids = await setDatabase();
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString(); 
    workshopId2 = ids.workshopId2.toString(); 
    workshopId3 = ids.workshopId3.toString();
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
      expect(res.body.name).toBe("Advanced Machine Learning Workshop");
  });
  }); 
    

  describe("AWT.2.0 - Admin get Workshop Request", () => {
    it("should return all workshops", async () => {
      const res = await request(app)
      .get(`/admin/getworkshop`)
      .set("Authorization", `Bearer ${adminToken}`);
      console.log('Workshops:', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });


   describe("AWT.3.0 - get Workshop Request by id", () => {
    it("should return a workshop", async () => {
      const res = await request(app)
      .get(`/admin/getworkshop/${workshopId}`)
      .set("Authorization", `Bearer ${adminToken}`);

      console.log('Workshop retrieved:', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', "66978299528ea72d01e2d311");
      console.log('WorkshopId:', "66978299528ea72d01e2d311");
    });
  });  

  
   describe("AWT.4.0 - Admin Edits Workshop Request", () => {
    it("should update a product", async () => {
      //const workshopId = '6695be7711e0918a004bfb93'; // This can be dynamically set
      const res = await request(app)
      .put(`/admin/updateworkshop/${workshopId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Updated Advanced Machine Learning Workshop",
        description: "Updated Description",
        startDate: "23rd July 2024",
        endDate: "26th July 2024",
        location: "Updated Location",
        timeStart: "10:00 AM",
        timeEnd: "1:00 PM",
        duration: 3,
        status: "Pending",
        type: "Non-Technical",
        maxParticipants: 25,
        client: {
          "_id": client1Id,
          "username": "theClient",
          "firstName": "Lewis",
          "lastName": "Hamilton",
          "email": "lewis@example.com",
          "password": "12345",
          "role": "client"
        },
        trainer: {
          "_id": trainer1Id,
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
        expect(res.body.code).toBe(200);
        expect(res.body.message).toBe("Workshop successfully updated");
        expect(res.body.workshop.name).toBe("Updated Advanced Machine Learning Workshop");
    });
  });  
  

   describe("AWT.5.0 - Admin Deletes Workshop Request", () => {
    it("should delete a workshop", async () => {
      const res = await request(app)
        .delete(`/admin/deleteworkshop/${workshopId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.body.code).toBe(200);
      console.log('Deleted workshop:', res.body); 
    });
  });

  describe("AWT.6.0 - Admin Rejects Workshop Request", () => {
    it ("should reject a workshop", async () => {
      const res = await request(app)
      .put(`/admin/updateworkshop/${workshopId2}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "Rejected"
      }); 
      expect(res.body.code).toBe(200);
      expect(res.body.message).toBe("Workshop successfully updated");
      expect(res.body.workshop.status).toBe("Rejected");
      console.log('Rejected workshop:', res.body); 
    });
  });


  describe("AWT.7.0 - Admin Accepts Workshop Request", () => {
    it ("should accept a workshop", async () => {
      const res = await request(app)
      .put(`/admin/updateworkshop/${workshopId3}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "Accepted"
      });
      expect(res.body.code).toBe(200);
      expect(res.body.message).toBe("Workshop successfully updated");
      expect(res.body.workshop.status).toBe("Accepted");
      console.log('Accepted workshop:', res.body); 
    });
  });

    /* Closing database connection after all test. */
     afterAll(async () => {
      await clearDB();
      cleanup();
    });

  });