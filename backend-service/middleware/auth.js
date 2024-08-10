//middleware/auth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Trainer = require("../models/trainer");
const Client = require("../models/client");

const secretKey = "root";

const authenticateUser = async (req, res, next) => {
  console.log("TESTING...............AU0.................");
  var response = {};
  if (!req.headers.authorization) {
    response = {
      code: 401,
      type: "authentication error",
      message: "No authorization token provided",
    };
    return res.status(401).send(response);
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log("Received Token:", token);
  try {
    console.log("TESTING...............authenticate1.................");  
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token:", decoded);
    let user;
    console.log(token);

    console.log(decoded.role);
    console.log(decoded);
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.AdminId);
      console.log("Admin user:", user);
  } 
    else if (decoded.role === 'trainer') {
      user = await Trainer.findById(decoded.TrainerId);
      console.log("Trainer user:", user);
  } 
    /*if (decoded.role !== 'trainer') {
      return res.status(403).send({ error: "Only Trainer can perform this action" });
  }*/
    else if (decoded.role === 'client') {
      user = await Client.findById(decoded.clientId);
      console.log("Client user:", user);
  }
    /*if (decoded.role !== 'client') {
      return res.status(403).send({ error: "Only Client can perform this action" });
  }*/

    if (!user) {
      console.log("not existing" , {user})
      response = {
        code: 404,
        type: "validation error",
        message: "Admin user not found",
      };
      return res.status(404).send(response);
    }
    console.log("TESTING...............AU3.................");  
    req.user = user;
    req.user.role = decoded.role;
    console.log("TESTING...............AU4.................");  
    next();
    console.log("TESTING...............AU5.................");  
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
      console.log(`Expected role: ${role}, User roles: ${req.user.role}`); // Add logging
      if (req.user.role.includes(role)) {
          next();
      } else {
        response = {
          code: 403,
          type: "authorization error",
          message: "Not authorized for this action",
        };
        return res.status(403).send(response);
      }
  };
}


module.exports = { authenticateUser, authorizeRole };
