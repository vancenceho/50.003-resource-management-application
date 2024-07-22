// TESTING LEAVE REQUEST ROUTE
const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controller/leaveRequestController");

router.get("/", leaveRequestController.getLeaveRequests);
//router.get("/get/", leaveRequestController.getLeaveRequestById);
router.post("/add/", leaveRequestController.createLeaveRequest);
router.put("/update/:id", leaveRequestController.updateLeaveRequest); // might need to change queries to include both trainerId & _id
router.delete("/delete/:id", leaveRequestController.deleteLeaveRequest); // might need to change queries to include both trainerId & _id

module.exports = router;
// TESTING LEAVE REQUEST ROUTE
