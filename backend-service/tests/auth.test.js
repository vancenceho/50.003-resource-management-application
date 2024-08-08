const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
jest.mock("jsonwebtoken");
const Admin = require("../models/admin");
jest.mock("../models/admin");

const { authenticateUser } = require("../middleware/auth");
const { describe } = require("node:test");

const app = express();
app.use(express.json());
app.get("/test", authenticateUser, (req, res) => {
  res.status(200).send("Access granted");
});

describe("Testing Authentication Middleware", () => {
  beforeEach(() => {
    jwt.verify.mockReset();
    Admin.findById.mockReset();
  });

  describe("Testing authenticateUser()", () => {
    it("should rejest requests without authorization token", async () => {
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
      const response = await request(app)
        .get("/test")
        .set("Authorization", "Bearer validtoken");
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        code: 403,
        type: "authorization error",
        message: "Only admins can perform this action",
      });
    });

    it("should grant access for valid token and authorized role", async () => {
      jwt.verify.mockReturnValue({ role: "admin", userId: "validid" });
      Admin.findById.mockResolvedValue({ _id: "validid" });
      const response = await request(app)
        .get("/test")
        .set("Authorization", "Bearer validtoken");
      expect(response.status).toBe(200);
      expect(response.text).toBe("Access granted");
    });

    describe("Testing authorizeRole()", () => {
      it("should return a middleware function", () => {
        const authorizeRole = require("../middleware/auth").authorizeRole;
        const middleware = authorizeRole("admin");
        expect(typeof middleware).toBe("function");
      });

      it("should return a 403 status code for unauthorized roles", async () => {
        jwt.verify.mockReturnValue({ role: "client" });
        const response = await request(app)
          .get("/test")
          .set("Authorization", "Bearer validtoken");
        expect(response.status).toBe(403);
        expect(response.body).toEqual({
          code: 403,
          type: "authorization error",
          message: "Only admins can perform this action",
        });
      });
    });
  });
});
