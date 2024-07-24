//middleware/auth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Trainer = require("../models/trainer");
const Client = require("../models/client");

const secretKey = "root";

const authenticateUser = async (req, res, next) => {
  console.log("TESTING...............AU0.................");
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "No authorization token provided" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log("TESTING...............AU1.................");
  try {
    console.log("TESTING...............authenticate1.................");  
    const decoded = jwt.verify(token, secretKey);
    console.log("TESTING...............authenticate2.................");  
    let user;
    console.log(token);

    console.log(decoded.role);
    console.log(decoded);
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.AdminId);
  } 
    else if (decoded.role === 'trainer') {
      user = await Trainer.findById(decoded.TrainerId);
  } 
    /*if (decoded.role !== 'trainer') {
      return res.status(403).send({ error: "Only Trainer can perform this action" });
  }*/
    else if (decoded.role === 'client') {
      user = await Client.findById(decoded.clientId);
  }
    /*if (decoded.role !== 'client') {
      return res.status(403).send({ error: "Only Client can perform this action" });
  }*/

    if (!user) {
      console.log(user)
      return res.status(404).send({ error: "No users found" });
    }
    console.log("TESTING...............AU3.................");  
    req.user = user;
    req.user.role = decoded.role;
    console.log("TESTING...............AU4.................");  
    next();
    console.log("TESTING...............AU5.................");  
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send({ error:  "Authentication failed"});
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
      console.log(`Expected role: ${role}, User roles: ${req.user.role}`); // Add logging
      if (req.user.role.includes(role)) {
          next();
      } else {
          return res.status(403).json({error: "Not authorized for this action"});
      }
  };
}


module.exports = { authenticateUser, authorizeRole };
