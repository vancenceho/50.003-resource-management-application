//middleware/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Trainer = require('../models/trainer');
const Client = require('../models/client');

const secretKey = "root";


const authenticateUser = async (req, res, next) => {
    console.log("TESTING...............0.................");
    if (!req.headers.authorization) {
        return res.status(401).send({ error: "No authorization token provided" });
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    console.log("TESTING...............1.................");
    try {
      const decoded = jwt.verify(token, secretKey);
      let user;
      console.log(token);

      console.log(decoded.role);
      console.log(decoded);
      if (decoded.role !== 'admin') {
        return res.status(403).send({ error: "Only admins can perform this action" });
    }
      if (decoded.role === 'admin') {
        user = await Admin.findById(decoded.userId);
    } 
      //else if (decoded.role === 'trainer') {
        //user = await Trainer.findById(decoded.id);
      //} else if (decoded.role === 'client') {
        //user = await Client.findById(decoded.id);
      //}
      console.log(decoded.id);
      if (!user) {
        console.log(user)
        return res.status(404).send({ error: "Admin user not found" });
      }
      console.log("TESTING...............6.................");  
      req.user = user;
      req.user.role = decoded.role;
      console.log("TESTING...............4.................");  
      next();
      console.log("TESTING...............5.................");  
    } catch (error) {
      res.status(401).send({ error:  "Authentication failed"});
    }
  };
  
  const authorizeRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).send({ error: 'Access denied.' });
      }
      next();
    };
  };


  module.exports = {authenticateUser, authorizeRole};
