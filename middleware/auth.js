//middleware/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Trainer = require('../models/trainer');
const Client = require('../models/client');

const secretKey = "root";


const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    try {
      const decoded = jwt.verify(token, secretKey);
      let user;
  
      if (decoded.role === 'admin') {
        user = await Admin.findById(decoded.id);
      } else if (decoded.role === 'trainer') {
        user = await Trainer.findById(decoded.id);
      } else if (decoded.role === 'client') {
        user = await Client.findById(decoded.id);
      }
  
      if (!user) {
        throw new Error();
      }
  
      req.user = user;
      req.user.role = decoded.role;
      next();
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
