const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const { app, dbConnectionPromise } = require("../app.js");
const fc = require("fast-check");
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); // Add this line to import jwt
const setDatabase = require("../systemintegrationtests/setDatabase");


// Function to log errors to a file
function logErrorToFile(error) {
    const logFilePath = path.join(__dirname, 'error.log');
    const logMessage = `${new Date().toISOString()} - ${error.message}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  }
 


describe("Fuzz Testing Workshop Endpoints", () => {
    let adminToken;
    beforeAll(async () => {
        //try {
        console.log("Connecting to the database...");
        //await connectDB();
       
        /*// Ensure the connection is established
        if (mongoose.connection.readyState !== 1) {
            throw new Error("Database connection not established");
        }*/
        //await cleanup();
        console.log("hi");
        await dbConnectionPromise;
        const ids = await setDatabase();
        console.log("Generated adminid:",  ids.adminId.toString());
        adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });

        /*} catch (error) {
          if (error.code === 11000) {
            logErrorToFile(new Error('Duplicate key error. Document already exists!'));
            // Handle the duplicate key error here (e.g., retry with different data)
          } else {
            console.error('An error occurred:', error);
            logErrorToFile(error);
            throw error;
          }
        }*/
    });
  


// Function to generate fuzzed parameters
const generateFuzzedParameters = () => {
  return fc.record({
    validId: fc.hexaString({ length: 24 }).filter(id => id.match(/^[a-fA-F0-9]{24}$/)), // Valid ObjectId format
    invalidId: fc.oneof(
      fc.string(), // Random strings
      fc.integer(), // Random integers
      fc.constantFrom("", " "), // Empty and whitespace
      fc.string({ minLength: 1, maxLength: 10 }).filter(str => !str.match(/^[a-fA-F0-9]{24}$/)) // Invalid ObjectId format
    ),
    validWorkshopData: fc.record({
      name: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 500 }),
      startDate: fc.date().map(date => date.toISOString()), // Convert Date to ISO string
      endDate: fc.date().map(date => date.toISOString()), // Convert Date to ISO string
      location: fc.string({ minLength: 1, maxLength: 200 }),
      timeStart: fc.string({ minLength: 5, maxLength: 10 }).filter(str => str.match(/^([01]\d|2[0-3]):([0-5]\d)$/)), // Time in HH:MM format
      timeEnd: fc.string({ minLength: 5, maxLength: 10 }).filter(str => str.match(/^([01]\d|2[0-3]):([0-5]\d)$/)), // Time in HH:MM format
      duration: fc.integer({ min: 1, max: 24 }), // Duration in hours
      status: fc.constantFrom("pending", "accepted", "rejected"), // Possible statuses
      type: fc.constantFrom("workshop", "seminar", "conference"), // Possible types
      maxParticipants: fc.integer({ min: 1, max: 100 }),
      client: fc.hexaString({ length: 24 }).filter(id => id.match(/^[a-fA-F0-9]{24}$/)), // Valid ObjectId format
      trainer: fc.array(fc.hexaString({ length: 24 }).filter(id => id.match(/^[a-fA-F0-9]{24}$/)), { minLength: 1, maxLength: 5 }) // Array of valid trainer IDs
    }),
    invalidWorkshopData: fc.record({
      name: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 500 }),
      startDate: fc.oneof(fc.string(), fc.integer()), // Invalid date format
      endDate: fc.oneof(fc.string(), fc.integer()), // Invalid date format
      location: fc.string({ minLength: 1, maxLength: 200 }),
      timeStart: fc.oneof(fc.string(), fc.integer()), // Invalid time format
      timeEnd: fc.oneof(fc.string(), fc.integer()), // Invalid time format
      duration: fc.oneof(fc.string(), fc.integer({ min: -10, max: 100 })), // Invalid duration
      status: fc.oneof(fc.string(), fc.integer(), fc.constantFrom("unknown")), // Invalid status
      type: fc.oneof(fc.string(), fc.integer(), fc.constantFrom("unknown")), // Invalid type
      maxParticipants: fc.oneof(fc.string(), fc.integer({ min: -10, max: 100 })), // Invalid number of participants
      client: fc.oneof(fc.string(), fc.integer()), // Invalid client ID
      trainer: fc.oneof(fc.string(), fc.integer()) // Invalid trainer IDs
    }),
  });
};

afterAll(async () => {
  try {
    //await mongoose.disconnect();
    await cleanup();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing the database connection:", error);
    logErrorToFile(error);
  }
});

  it("should handle various parameters for add, update, and delete workshop endpoints", async () => {
    await fc.assert(
      fc.asyncProperty(
        generateFuzzedParameters(),
        async ({ validId, invalidId, validWorkshopData, invalidWorkshopData }) => {
          //try {
            // Test add workshop with valid data
            await request(app)
              .post("/admin/addworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send(validWorkshopData);

            // Test add workshop with invalid data
            await request(app)
              .post("/admin/addworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send(invalidWorkshopData);

            // Test update workshop with valid and invalid IDs
            await request(app)
              .put(`/admin/updateworkshop/${validId}`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send(validWorkshopData);

            await request(app)
              .put(`/admin/updateworkshop/${invalidId}`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send(validWorkshopData);

            // Test delete workshop with valid and invalid IDs
            await request(app)
              .delete(`/admin/deleteworkshop/${validId}`)
              .set("Authorization", `Bearer ${adminToken}`);

            await request(app)
              .delete(`/admin/deleteworkshop/${invalidId}`)
              .set("Authorization", `Bearer ${adminToken}`);

            // Test allocate trainer to workshop with valid and invalid data
            await request(app)
              .post("/admin/alloctrainertoworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send({ workshopId: validId, trainerId: validWorkshopData.trainer[0] });

            await request(app)
              .post("/admin/alloctrainertoworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send({ workshopId: invalidId, trainerId: invalidWorkshopData.trainer });
          } 
        
      ) //.withSettings({ numRuns: 10 }) // Limiting the number of runs for each property
    );
  });
});
