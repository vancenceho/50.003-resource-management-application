const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controller/leaveRequestController.js");
const trainerController = require("../controller/trainerController.js");

// Middleware Controller
const { authenticateUser, authorizeRole } = require("../middleware/auth");

// Define routes and associate them with controller actions
router.post("/", trainerController.createTrainer); // Route to create a new user
router.get("/", trainerController.getAllTrainers); // Route to get all users
router.post("/submitLeaveRequest", trainerController.submitLeaveRequest); // Route to submit a leave request

// Export the router
module.exports = router;
