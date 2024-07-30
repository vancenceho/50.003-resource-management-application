
const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin.js");
const { describe } = require("node:test");


 describe("Testing Trainer to Workshop Endpoints", () => {
    let adminToken, trainerToken;
    let client1Id, trainer1Id, workshopId, workshopId2;

  /* Connecting to the database before all test. */
  beforeAll(async () => {
    // Insert initial data
    await connectDB();
    const ids = await setDatabase();
    app = require("../app.js");
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    trainerToken = jwt.sign({ TrainerId: ids.trainerId.toString(), role: "trainer" }, "root", { expiresIn: "1h" });
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString(); 
    workshopId2 = ids.workshopId2.toString(); 
  });

// TWT.1.0 - Admin allocates Trainer to Workshop
// WorkshopManagement. allocateTrainerToWorkshop
describe(" TWT.1.0 - Admin allocates Trainer to Workshop ", () => {
  it("should allocate trainers to selected workshop", async () => {
    const res = await request(app)
    .post(`/admin/alloctrainertoworkshop`)
    .set("Authorization", `Bearer ${adminToken}`)
    .query({ 
        workshopId: workshopId2, 
        trainerIds: trainer1Id
    });
    console.log('Workshops Allocated to Trainer :', res.body); // Print the workshops      
    expect(res.statusCode).toBe(200);
    //expect(res.body.length).toBeGreaterThan(0); 
    console.log('TrainerId:', trainer1Id);

});
}); 

// TWT.2.0 - Trainer Views His/Her Assigned Workshops 
// WorkshopManagement. getAllocatedWorkshops
describe(" TWT.2.0 - Trainer Views His/Her Assigned Workshops ", () => {
  it("should show allocated workshop", async () => {
    const res = await request(app)
    .get(`/trainer/getallocworkshop/:id`)
    .set("Authorization", `Bearer ${trainerToken}`)
    .query({ 
        id: trainer1Id
    });
    console.log('Workshops Allocated to Trainer :', res.body); // Print the workshops      
    expect(res.statusCode).toBe(200);
    console.log('TrainerId:', trainer1Id);

});
}); 

// TWT.3.0 - Trainer Marks their Workshop as Complete
describe ("TWT.3.0 - Trainer Marks their Workshop as Complete", () => {
  it("trainer should mark the workshop as complete", async () => {
    const res = await request(app)
    .post(`/trainer/markworkshopcomplete/:id`)
    .set("Authorization", `Bearer ${trainerToken}`)
    .query({ 
        id: workshopId2
    });
    console.log('Workshop Marked as Complete :', res.body); // Print the workshops      
    expect(res.statusCode).toBe(200);
    expect(res.body.workshop.status).toBe("Completed");
}); 
}); 

// TWT.4.0 - Dashboard - Workshops Count for Trainers
describe("TWT.4.0 - Dashboard - Workshops Count for Trainers", () => {
  it("should return the number of workshops allocated for each trainer over a period of time", async () => {
    const res = await request(app)
      .get(`/dashboard/workshopscount`)
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ 
        startDate: "10th October 2023",
        endDate: "12th October 2023"
      });

    console.log('Workshops Count for Trainers:', res.body.data); // Print the workshops count      
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});

   /* Closing database connection after all test. */
    afterAll(async () => {
      await clearDB();
      await cleanup();
      });
  
    });