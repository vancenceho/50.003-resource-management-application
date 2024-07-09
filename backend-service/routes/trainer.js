const express = require('express');
const router = express.Router();
const trainerController = require('../controller/trainerController.js'); // Import the user controller

// Define routes and associate them with controller actions
router.post('/', trainerController.createTrainer); // Route to create a new user
router.get('/', trainerController.getAllTrainers); // Route to get all users

// Export the router
module.exports = router;
