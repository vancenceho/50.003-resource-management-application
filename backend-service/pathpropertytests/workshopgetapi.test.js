const request = require("supertest");
const app = require("../app"); // Adjust the path to your app
const fc = require("fast-check");

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
      startDate: fc.date().toISOString(), // ISO string format
      endDate: fc.date().toISOString(), // ISO string format
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

describe("Fuzz Testing Workshop Endpoints", () => {
  it("should handle various parameters for add, update, and delete workshop endpoints", async () => {
    await fc.assert(
      fc.asyncProperty(
        generateFuzzedParameters(),
        async ({ validId, invalidId, validWorkshopData, invalidWorkshopData }) => {
          try {
            // Test add workshop with valid data
            let res = await request(app)
              .post("/addworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send(validWorkshopData);

            console.log("POST /addworkshop with valid data:", res.status, res.body);

            // Test add workshop with invalid data
            res = await request(app)
              .post("/addworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send(invalidWorkshopData);

            console.log("POST /addworkshop with invalid data:", res.status, res.body);

            // Test update workshop with valid and invalid IDs
            res = await request(app)
              .put(`/updateworkshop/${validId}`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send(validWorkshopData);

            console.log("PUT /updateworkshop/:id with valid ID:", res.status, res.body);

            res = await request(app)
              .put(`/updateworkshop/${invalidId}`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send(validWorkshopData);

            console.log("PUT /updateworkshop/:id with invalid ID:", res.status, res.body);

            // Test delete workshop with valid and invalid IDs
            res = await request(app)
              .delete(`/deleteworkshop/${validId}`)
              .set("Authorization", `Bearer ${adminToken}`);

            console.log("DELETE /deleteworkshop/:id with valid ID:", res.status, res.body);

            res = await request(app)
              .delete(`/deleteworkshop/${invalidId}`)
              .set("Authorization", `Bearer ${adminToken}`);

            console.log("DELETE /deleteworkshop/:id with invalid ID:", res.status, res.body);

            // Test allocate trainer to workshop with valid and invalid data
            res = await request(app)
              .post("/alloctrainertoworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send({ workshopId: validId, trainerId: validWorkshopData.trainer[0] });

            console.log("POST /alloctrainertoworkshop with valid data:", res.status, res.body);

            res = await request(app)
              .post("/alloctrainertoworkshop")
              .set("Authorization", `Bearer ${adminToken}`)
              .send({ workshopId: invalidId, trainerId: invalidWorkshopData.trainer });

            console.log("POST /alloctrainertoworkshop with invalid data:", res.status, res.body);
          } catch (error) {
            console.error("Error occurred:", error);
            throw error;
          }
        }
      )
    );
  });
});
