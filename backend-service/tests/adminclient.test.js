const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const setDatabase = require("./setDatabase");
const jwt = require("jsonwebtoken");

describe("Testing Admin Client Endpoints", () => {
  let adminToken;
  let clientToken;
  let client1Id, trainer1Id, workshopId;
  
  /* Connecting to the database before all tests. */
  beforeAll(async () => {
    await connectDB();
    const ids = await setDatabase();
    app = require("../app.js");
    client1Id = ids.clientId.toString();
    trainer1Id = ids.trainerId.toString();
    workshopId = ids.workshopId.toString(); 
    adminToken = jwt.sign({ AdminId: ids.adminId.toString() , role: "admin" }, "root", { expiresIn: "1h" });
    clientToken = jwt.sign({ clientId: client1Id, role: "client" }, "root", { expiresIn: "1h" });

  });

  /*beforeEach(async () => {
    await setDatabase();
    adminToken = jwt.sign({ AdminId: "66978299528ea72d01e2d308", role: "admin" }, "root", { expiresIn: "1h" });
    //clientToken = jwt.sign({ clientId: "66978299528ea72d01e2d309", role: "client" }, "root", { expiresIn: "1h" });
  });*/

 // ACT.1.0 - Admin Adds a New Client
  describe("ACT.1.0 - Admin Adds a New Client", () => {
  it("create client account", async () => {
    const res = await request(app)
    .post(`/admin/addclient`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      username: "client3",
      firstName: "Robin",
      lastName: "Hood",
      email: "robin@example.com",
      password: "12345",
      role: "client"
    });

    expect.stringContaining("json");
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("Robin");
  });
}); 


// ACT.2.0 - Client login with credential (username or email)
describe(" ACT.2.0 - Client login with credential (username or email)", () => {
  test("testing login with client account", async () => {
    const res = await request(app)
    .post(`/client/login`)
    .set("Authorization", `Bearer ${clientToken}`)
    .query({
      credential: "client1", // or "david@example.com" to test email login
        password: "12345"
    });

    expect(res.status).toBe(200);
    console.log(res.body);
  });
}); 


// ACT.3.0 - Admin Gets a Client by ID
describe("ACT.3.0 - Admin Gets a Client by ID", () => {
  test("should return a client", async () => {
    const res = await request(app)
    .get(`/admin/getclient/${client1Id}`)
    .set("Authorization", `Bearer ${adminToken}`)

    console.log('Clients :', res.body); // Print the workshops
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', client1Id);
    console.log('clientId:', client1Id);
  });

}); 

// ACT.4.0 - Admin Updates Client Information
describe("ACT.4.0 - Admin Updates Client Information", () => {
  it("should update a client", async () => {
    const res = await request(app)
    .put(`/admin/updateclient/${client1Id}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
        username: "client2",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "12345",
        role: "client"
      });
      console.log('updated Client:', res.body); // Print the workshops
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe("client2");
  });
});  

// ACT.5.0 - Admin Deletes a Client
describe("ACT.5.0 - Admin Deletes a Client", () => {
  it("should delete a client", async () => {
    const res = await request(app)
    .delete(`/admin/deleteclient/${client1Id}`)
    .set("Authorization", `Bearer ${adminToken}`)
    console.log('Deleted Client ID:', client1Id); 
    expect(res.statusCode).toBe(200);
  });
});



    /* Closing database connection after all test. */
    afterAll(async () => {
      await clearDB();
      await cleanup();
    });

  });