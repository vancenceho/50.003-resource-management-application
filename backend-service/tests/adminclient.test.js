const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");

describe("Testing Client Endpoints", () => {
  let randomClientId; 
  const adminToken = jwt.sign({ AdminId: "66978299528ea72d01e2d308", role: "admin" }, "root", { expiresIn: "1h" });
  const clientToken = jwt.sign({ clientId: "669785397e9a0985a34809ad", role: "client" }, "root", { expiresIn: "1h" });

  /* Connecting to the database before all test. */
  beforeAll(async () => {
    await connectDB();
    app = require("../app.js");
    // Fetch all clients
    const res = await request(app)
    .get("/admin/getclient")
    .set("Authorization", `Bearer ${adminToken}`);
    const clients = res.body;
    // Select a random client ID
    randomClientId = clients[Math.floor(Math.random() * clients.length)]._id;

  });

  //works
  describe("POST /admin/addclient", () => {
  it("create client account", async () => {
    const res = await request(app)
    .post("/admin/addclient")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
        "username": "client2",
        "firstName": "jane",
        "lastName": "doe",
        "email": "jane@example.com",
        "password": "12345",
        "role": "client"
    });

    expect.stringContaining("json");
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("jane");
  });
}); 


// client permission -- works
  describe("GET /client/login", () => {
  test("testing login with client account", async () => {
    const res = await request(app)
    .get("/client/login")
    .set("Authorization", `Bearer ${clientToken}`)
    .query({
      credential: "theClient", // or "lewis@example.com" to test email login
        password: "12345"
    });

    expect(res.status).toBe(200);
    console.log(res.body);
  });
}); 

/*
// client permission
describe("GET /admin/getclient/:id", () => {
  test("testing login with client account", async () => {
    const res = await request(app)
    .get("/admin/getclient/:id")
    .set("Authorization", `Bearer ${clientToken}`)
    .query({
      _id: "669785397e9a0985a34809ad", 
    });

    expect(res.status).toBe(200);
    console.log(res.body);
  });
}); 

describe("PUT /admin/updateclient", () => {
  it("should update a client", async () => {
    const res = await request(app)
    .put(`/admin/updateclient`)
    .set("Authorization", `Bearer ${adminToken}`)
    .query({
      _id: "669785397e9a0985a34809ad"
    })
    .send({
        "username": "client3",
        "firstName": "david",
        "lastName": "ling",
        "email": "david@example.com",
        "password": "12345",
        "role": "client"
      });
      console.log('updated Client:', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe("client3");
  });
});  

describe("DELETE /admin/deleteclient", () => {
  it("should delete a client", async () => {
    const res = await request(app)
    .delete(`/admin/deleteclient`)
    .set("Authorization", `Bearer ${adminToken}`);
    .query({
      _id: "669785397e9a0985a34809ad"
    });
    console.log('deleted client:');
    expect(res.statusCode).toBe(200);
  });
});
*/
    /* Closing database connection after all test. */
    afterAll(async () => {
      await cleanup();
    });

  });