const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");

describe("Testing Admin Client Endpoints", () => {
  let randomClientId; 
  let clientToken;
  const adminToken = jwt.sign({ AdminId: "66978299528ea72d01e2d308", role: "admin" }, "root", { expiresIn: "1h" });

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
    clientToken = jwt.sign({ clientId: randomClientId, role: "client" }, "root", { expiresIn: "1h" });


  });

 // ACT.1.0 - Admin Adds a New Client
  describe("POST /admin/addclient", () => {
  it("create client account", async () => {
    const res = await request(app)
    .post("/admin/addclient")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
        "username": "client1",
        "firstName": "david",
        "lastName": "ling",
        "email": "david@example.com",
        "password": "12345",
        "role": "client"
    });

    expect.stringContaining("json");
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("david");
  });
}); 


// ACT.2.0 - Client login with credential (username or email)
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


// ACT.3.0 - Admin Gets a Client by ID
describe("GET /admin/getclient/:id", () => {
  test("should return a client", async () => {
    const res = await request(app)
    .get("/admin/getclient/:id")
    .set("Authorization", `Bearer ${adminToken}`)
    .query({
      id: randomClientId});
  
    console.log('Clients :', res.body); // Print the workshops
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', randomClientId);
    console.log('randomClientId:', randomClientId);
  });
}); 

// ACT.4.0 - Admin Updates Client Information
describe("PUT /admin/updateclient", () => {
  it("should update a client", async () => {
    const res = await request(app)
    .put(`/admin/updateclient`)
    .set("Authorization", `Bearer ${adminToken}`)
    .query({
      id: randomClientId
    })
    .send({
        username: "client3",
        firstName: "robin",
        lastName: "hood",
        email: "robin@example.com",
        password: "12345",
        role: "client"
      });
      console.log('updated Client:', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe("client3");
  });
});  

// ACT.5.0 - Admin Deletes a Client
/*describe("DELETE /admin/deleteclient", () => {
  it("should delete a client", async () => {
    const res = await request(app)
    .delete(`/admin/deleteclient`)
    .set("Authorization", `Bearer ${adminToken}`)
    .query({
      id: randomClientId
    });
    console.log('Deleted Client ID:', randomClientId);
    expect(res.statusCode).toBe(200);
  });
});
*/


    /* Closing database connection after all test. */
    afterAll(async () => {
      await cleanup();
    });

  });