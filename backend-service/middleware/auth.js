//middleware/auth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Trainer = require("../models/trainer");
const Client = require("../models/client");

const secretKey = "root";

const authenticateUser = async (req, res, next) => {
  let response = {};
  console.log("TESTING...............0.................");
  if (!req.headers.authorization) {
    response = {
      code: 401,
      type: "authentication error",
      message: "No authorization token provided",
    };
    return res.status(401).send(response);
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log("TESTING...............1.................");
  try {
    const decoded = jwt.verify(token, secretKey);
    let user;
    console.log(token);

    console.log(decoded.role);
    console.log(decoded);
    if (decoded.role !== "admin") {
      response = {
        code: 403,
        type: "authorization error",
        message: "Only admins can perform this action",
      };
      return res.status(403).send(response);
    }
    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.userId);
    } else if (decoded.role === "client") {
      user = await Client.findById(decoded.userId);
    }
    //else if (decoded.role === 'trainer') {
    //user = await Trainer.findById(decoded.id);
    //} else if (decoded.role === 'client') {
    //user = await Client.findById(decoded.id);
    //}
    console.log(decoded.id);
    if (!user) {
      console.log(user);
      response = {
        code: 404,
        type: "validation error",
        message: "Admin user not found",
      };
      return res.status(404).send(response);
    }
    console.log("TESTING...............6.................");
    req.user = user;
    req.user.role = decoded.role;
    console.log("TESTING...............4.................");
    next();
    console.log("TESTING...............5.................");
  } catch (error) {
    response = {
      code: 401,
      type: "authentication error",
      message: "Authentication failed",
    };
    res.status(401).send(response);
  }
};

const authorizeRole = (role) => {
  let response = {};
  return (req, res, next) => {
    if (req.user.role !== role) {
      response = {
        code: 403,
        type: "authorization error",
        message: "Access denied",
      };
      return res.status(403).send(response);
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRole };
