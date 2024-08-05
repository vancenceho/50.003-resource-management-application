const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");
const fc = require("fast-check");
const { app, dbConnectionPromise } = require("../app.js");

// Mock the setDatabase module
jest.mock("./setDatabase");

describe("Testing Admin Client Endpoints", () => {
  let adminToken;
  let client1Id;

  /* Connecting to the database before all tests. */
  beforeAll(async () => {
    await dbConnectionPromise;
    const ids = {
      clientId: new mongoose.Types.ObjectId(),
      adminId: new mongoose.Types.ObjectId(),
    };
    console.log("Generated IDs:", ids);
    //setDatabase.mockResolvedValue(ids);
    client1Id = ids.clientId.toString();
    adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    setDatabase.mockResolvedValue(ids);
    console.log("Generated adminToken:", adminToken);
  });

// ACT.1.0 - Admin Adds a New Client with fuzzing
describe("ACT.1.0 - Admin Adds a New Client", () => {
  it("create client account with fuzzing", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          username: fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
          firstName: fc.string({ minLength: 2, maxLength: 50 }).filter((str) => /^[a-zA-Z]{2,50}$/.test(str)),
          lastName: fc.string({ minLength: 2, maxLength: 50 }).filter((str) => /^[a-zA-Z]{2,50}$/.test(str)),
          email: fc.emailAddress(),
          password: fc.string({ minLength: 5, maxLength: 30 }).filter((str) => str.trim().length > 0),
          role: fc.constantFrom("client", "admin", "trainer"),
        }).filter(({ username }) => username !== " "),
        async (clientData) => {
          try {
            console.log("Generated client data:", clientData);
            console.log("Admin Token:", adminToken); // Log the admin token
            const res = await request(app)
              .post(`/admin/addclient`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send(clientData);

              console.log("API response status:", res.status); // Log the response status
              console.log("API response body:", res.body); // Log the response body
              console.log("API response headers:", res.headers); // Log the response headers

              // Adjust based on expected results
              expect([200, 400, 409]).toContain(res.status);
            } catch (error) {
              console.error("Error occurred:", error);
              throw error;
            }
          }
        )
      );
    });
  });

  // ACT.2.0 - Client login with credential (Fuzz Test)
  describe("ACT.2.0 - Client login with credential (Fuzz Test)", () => {
    it("fuzz test login with client account", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.oneof(fc.string({ minLength: 1, maxLength: 30 }).filter((str) => str.trim().length > 0), fc.emailAddress()),
          fc.string({ minLength: 5, maxLength: 30 }),
          async (credential, password) => {
            const res = await request(app)
              .post(`/client/login`)
              .send({
                credential,
                password,
              });

            if (res.statusCode === 200) {
              expect(res.body.message).toBe("Authentication successful");
              expect(res.body).toHaveProperty("token");
            }
          }
        )
      );
    });
  });

  // ACT.4.0 - Admin Updates Client Information (Fuzz Test)
  describe("ACT.4.0 - Admin Updates Client Information (Fuzz Test)", () => {
    it("fuzz test update a client", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            username: fc.string({ minLength: 1, maxLength: 30 }).filter((str) => str.trim().length > 0),
            firstName: fc.string({ minLength: 1, maxLength: 30 }).filter((str) => str.trim().length > 0),
            lastName: fc.string({ minLength: 1, maxLength: 30 }).filter((str) => str.trim().length > 0),
            email: fc.emailAddress(),
            password: fc.string({ minLength: 5, maxLength: 30 }),
            role: fc.constantFrom("client", "admin", "trainer"),
          }),
          async (updatedClient) => {
            const res = await request(app)
              .put(`/admin/updateclient/${client1Id}`)
              .set("Authorization", `Bearer ${adminToken}`)
              .send(updatedClient);

            if (res.statusCode === 200) {
              expect(res.body.message).toBe("Client successfully updated");
              expect(res.body.client.username).toBe(updatedClient.username);
            }
          }
        )
      );
    });
  });

  /* Closing database connection after all tests. */
  afterAll(async () => {
    await clearDB();
    await cleanup();
  });
});