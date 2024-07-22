
// TWT.2.0 - marks their workshop as complete
// WorkshopManagement. updateWorkshopStatustoComplete
const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");


 describe("Testing Trainer to Workshop Endpoints", () => {
    let trainerToken;
    let client1Id, trainer1Id, workshopId;

  /* Connecting to the database before all test. */
  beforeAll(async () => {
    // Insert initial data
    await connectDB();
    const ids = await setDatabase();
    app = require("../app.js");
    trainerToken = jwt.sign({ TrainerId: ids.trainerId.toString(), role: "trainer" }, "root", { expiresIn: "1h" });
    client1Id = ids.clientId.toString();
    console.log('client1Id:', client1Id);
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString(); 
  });


// TWT.1.0 - Trainer Views His/Her Assigned Workshops 
// WorkshopManagement. getAllocatedWorkshops
describe(" TWT.1.0 - Trainer Views His/Her Assigned Workshops ", () => {
  it("should show allocated workshop", async () => {
    const res = await request(app)
    .get("/trainer/getAllocatedWorkshops")
    .set("Authorization", `Bearer ${trainerToken}`)
    .query({ 
        //workshopId: randomWorkshopId, 
        trainerId: trainer1Id
    });
    console.log('Workshops Allocated to Trainer :', res.body); // Print the workshops      
    expect(res.statusCode).toBe(200);
    //expect(res.body.length).toBeGreaterThan(0); 
    console.log('randomTrainerId:', trainer1Id);

});
}); 


   /* Closing database connection after all test. */
    afterAll(async () => {
      await clearDB();
        cleanup();
      });
  
    });