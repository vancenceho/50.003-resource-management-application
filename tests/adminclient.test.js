const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const jwt = require("jsonwebtoken");

describe("Testing Client Endpoints", () => {
  const adminToken = jwt.sign({ AdminId: "668a6698f2e74ea82b18c120", role: "admin" }, "root", { expiresIn: "1h" });

  /* Connecting to the database before all test. */
  beforeAll(async () => {
    await connectDB();
    app = require("../app.js");
  });

  describe("POST /admin/addclient", () => {
  it("create client account", async () => {
    const res = await request(app)
    .set("Authorization", `Bearer ${adminToken}`)
    .post("/addclient")
    .send({
      username: "jengkuen",
      password: "sdefret56yhg",
      email: "jk@example.com",
    });
      expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.status).toBe(200);
  });
}); 



  describe("GET /clientLogin", () => {
  test("testing login with client account", async () => {
    const response = await supertest(app).post("/clientLogin").send({
      username: "client",
      password: "client",
    });
    const tokenCookie = response.headers['set-cookie'].find(cookie => 
      cookie.startsWith('token=')
    );
    tokenValue = tokenCookie.split('=')[1].split(';')[0];
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.status).toBe(200);
  });
}); 


    /* Closing database connection after all test. */
    afterAll(async () => {
      cleanup();
    });

  });
