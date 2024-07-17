// TESTING LEAVE REQUEST ROUTE
const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controller/leaveRequestController");

router.get("/", leaveRequestController.getLeaveRequests);
//router.get("/get/", leaveRequestController.getLeaveRequestById);
router.post("/add/", leaveRequestController.createLeaveRequest);
router.put("/update/", leaveRequestController.updateLeaveRequest); // might need to change queries to include both trainerId & _id
router.delete("/delete/", leaveRequestController.deleteLeaveRequest); // might need to change queries to include both trainerId & _id

module.exports = router;
// TESTING LEAVE REQUEST ROUTE
