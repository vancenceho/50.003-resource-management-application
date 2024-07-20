
// TWT.2.0 - marks their workshop as complete
// WorkshopManagement. updateWorkshopStatustoComplete


const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");


 describe("Testing Trainer to Workshop Endpoints", () => {
    let randomWorkshopId; 
    let randomTrainerId; 
    let trainerToken;
     
  /* Connecting to the database before all test. */
  beforeAll(async () => {
    await connectDB();
    app = require("../app.js");

    // Fetch all trainers
    const trainerRes = await request(app)
    .get("/trainer/getTrainers")
    const trainers = trainerRes.body;
    // Select a random trainer ID
    randomTrainerId = trainers[Math.floor(Math.random() * trainers.length)]._id;
    trainerToken = jwt.sign({ TrainerId: randomTrainerId, role: "trainer" }, "root", { expiresIn: "1h" });

    // Fetch all workshops
    const workshopsRes = await request(app)
    .get("/workshop/")
    const workshops = workshopsRes.body;
    // Select a random workshop ID
    randomWorkshopId = workshops[Math.floor(Math.random() * workshops.length)]._id;

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
        trainerId: randomTrainerId
    });
    console.log('Workshops Allocated to Trainer :', res.body); // Print the workshops      
    expect(res.statusCode).toBe(200);
    //expect(res.body.length).toBeGreaterThan(0); 
    console.log('randomTrainerId:', randomTrainerId);

});
}); 


   /* Closing database connection after all test. */
    afterAll(async () => {
        cleanup();
      });
  
    });