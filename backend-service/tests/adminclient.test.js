const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");

describe("Testing Client Endpoints", () => {
  let randomClientId; 
  const adminToken = jwt.sign({ AdminId: "668a6698f2e74ea82b18c120", role: "admin" }, "root", { expiresIn: "1h" });
  const clientToken = jwt.sign({ clientId: "668a44ad249f904255112be3", role: "client" }, "root", { expiresIn: "1h" });

  /* Connecting to the database before all test. */
  beforeAll(async () => {
    await connectDB();
    app = require("../app.js");
    // Fetch all workshops
    const res = await request(app).get("/admin/getclient").set("Authorization", `Bearer ${adminToken}`);
    const clients = res.body;
    // Select a random workshop ID
    randomClientId = clients[Math.floor(Math.random() * clients.length)]._id;
    app = require("../app.js");
  });

  describe("POST /admin/addclient", () => {
  it("create client account", async () => {
    const res = await request(app)
    .post("/admin/addclient")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
        "firstName": "jane",
        "lastName": "doe",
        "userName": "janedoe",
        "password": "hellojane",
        "email": "jane@example.com",
        "role": "client",
        "__v": 0
    });

    expect.stringContaining("json");
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe("jane");
  });
}); 


// client permission
  describe("GET /client/clientLogin", () => {
  test("testing login with client account", async () => {
    const response = await request(app)
    .post("/client/clientLogin")
    .set("Authorization", `Bearer ${clientToken}`)
    .send({
      username: "jengkuen",
      password: "sdefret56yhg",
      email: "jk@example.com",
    });

    expect(response.status).toBe(200);
    console.log(res.body);
  });
}); 


    /* Closing database connection after all test. */
    afterAll(async () => {
      cleanup();
    });

  });
