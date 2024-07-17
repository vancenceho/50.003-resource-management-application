const express = require('express');
const router = express.Router();
const trainerController = require('../controller/trainerController.js'); // Import the user controller
const workshopController = require('../controller/workshopManagement.js'); // Import the workshop controller
//const LeaveReqController = require('../controller/leaveRequestController.js'); // Import the workshop controller

// Middleware functions
const {authenticateUser, authorizeRole} = require('../middleware/auth');

// Define routes and associate them with controller actions
router.post('/add', trainerController.createTrainer); 
router.get('/getTrainerDetails', trainerController.getAllTrainers); //getTrainerDetails
router.get("/trainerlogin", trainerController.Trainerlogin);


//router.put("/markWorkshop", authenticateUser, authorizeRole('trainer'), workshopController.updateWorkshopStatustoComplete);

/*
// not done yet---------------------------------------------------
//need to add leave requests in the database?
router.get("/getLeaveRequests", trainerController.getLeaveRequests);
router.get("/getLeaveRequest:id", trainerController.getLeaveRequestById);
router.put("/updateLeaveStatus", trainerController.updateLeaveStatus);
router.get("/getworkshop", authenticateUser, authorizeRole('trainer'), workshopController.getWorkshopRequests);
router.put("/markWorkshop", authenticateUser, authorizeRole('trainer'), workshopController.markWorkshopComplete);


router.post("/addTrainer", authenticateUser, authorizeRole("trainer"), LeaveReqController.createLeaveRequest);
router.get("/updateAvailStatus:id", authenticateUser, authorizeRole("trainer"), LeaveReqController.getLeaveRequestById);


//*/

router.get("/getAllocatedWorkshops", authenticateUser, authorizeRole("trainer"), workshopController.getAllocatedWorkshops);
//use trainer id to reteive allocated workshops and then compare dates of workshop 
//router.get("/checkforSchedConflict", authenticateUser, authorizeRole("trainer"), workshopController.checkforSchedConflict);

// Export the router
module.exports = router;
