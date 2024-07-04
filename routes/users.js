const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js'); // Import the user controller

// Define routes and associate them with controller actions
router.post('/', userController.createUser); // Route to create a new user
router.get('/', userController.getAllUsers); // Route to get all users

// Export the router
module.exports = router;
