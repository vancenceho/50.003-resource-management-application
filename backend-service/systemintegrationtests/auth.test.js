const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
jest.mock("jsonwebtoken");
const Admin = require("../models/admin");
const Trainer = require("../models/trainer");
const Client = require("../models/client");
jest.mock("../models/admin");
jest.mock("../models/trainer");
jest.mock("../models/client");

const { authenticateUser, authorizeRole } = require("../middleware/auth");

const app = express();
app.use(express.json());
app.get("/test", authenticateUser, authorizeRole("admin"), (req, res) => {
  res.status(200).send("Access granted");
});

describe("Testing Authentication Middleware", () => {
  beforeEach(() => {
    jwt.verify.mockReset();
    Admin.findById.mockReset();
    Trainer.findById.mockReset();
    Client.findById.mockReset();
  });

  describe("Testing authenticateUser()", () => {
    it("should reject requests without authorization token", async () => {
      const response = await request(app).get("/test");
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        code: 401,
        type: "authentication error",
        message: "No authorization token provided",
      });
    });

    it("should reject requests with invalid token", async () => {
      jwt.verify.mockImplementation(() => {
        throw new Error("invalid token");
      });
      const response = await request(app)
        .get("/test")
        .set("Authorization", "Bearer invalidtoken");
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        code: 401,
        type: "authentication error",
        message: "Authentication failed",
      });
    });

    it("should reject unauthorized roles", async () => {
      jwt.verify.mockReturnValue({ role: "client" });
      Client.findById.mockResolvedValue({ _id: "validid" });
      const response = await request(app)
        .get("/test")
        .set("Authorization", "Bearer validtoken");
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        code: 403,
        type: "authorization error",
        message: "Not authorized for this action",
      });
    });

    it("should grant access for valid token and authorized role", async () => {
      jwt.verify.mockReturnValue({ role: "admin", AdminId: "validid" });
      Admin.findById.mockResolvedValue({ _id: "validid" });
      const response = await request(app)
        .get("/test")
        .set("Authorization", "Bearer validtoken");
      expect(response.status).toBe(200);
      expect(response.text).toBe("Access granted");
    });

    it("should reject requests for valid token but unauthorized role", async () => {
      jwt.verify.mockReturnValue({ role: "trainer", TrainerId: "validid" });
      Trainer.findById.mockResolvedValue({ _id: "validid" });
      const response = await request(app)
        .get("/test")
        .set("Authorization", "Bearer validtoken");
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        code: 403,
        type: "authorization error",
        message: "Not authorized for this action",
      });
    });
  });

  describe("Testing authorizeRole()", () => {
    it("should return a middleware function", () => {
      const middleware = authorizeRole("admin");
      expect(typeof middleware).toBe("function");
    });

    it("should return a 403 status code for unauthorized roles", async () => {
      jwt.verify.mockReturnValue({ role: "client" });
      Client.findById.mockResolvedValue({ _id: "validid" });
      const response = await request(app)
        .get("/test")
        .set("Authorization", "Bearer validtoken");
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        code: 403,
        type: "authorization error",
        message: "Not authorized for this action",
      });
    });
  });
});