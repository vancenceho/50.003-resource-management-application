const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshopManagement");
// Middleware functions

const {authenticateUser, authorizeRole} = require('../middleware/auth');

/*
router.get("/get", authenticateUser, authorizeRole('admin'), workshopController.getWorkshopRequests);

router.get("/get/:id", authenticateUser, authorizeRole('admin'), workshopController.getWorkshopRequestById);

router.post("/add", authenticateUser, authorizeRole('admin'), workshopController.createWorkshopRequest);

router.put("/update", authenticateUser, authorizeRole('admin'), workshopController.updateWorkshopRequest);

router.delete("/delete", authenticateUser, authorizeRole('admin'), workshopController.deleteWorkshopRequest);
*/



module.exports = router;
