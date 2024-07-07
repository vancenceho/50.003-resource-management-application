const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshopManagement");
//const authController = require("../controller/authController");
const adminController = require("../controller/adminController");

// Middleware functions
const {authenticateUser, authorizeRole} = require('../middleware/auth');

// Example routes with authentication and authorization
router.post("/createadmin", adminController.createAdmin);
router.get("/adminlogin", adminController.Adminlogin);
router.get("/getadmin", adminController.getAllAdmin); 


router.get("/", authenticateUser, authorizeRole('admin'), workshopController.getWorkshopRequests);

router.get("/get/:id", authenticateUser, authorizeRole('admin'), workshopController.getWorkshopRequestById);

router.post("/add", authenticateUser, authorizeRole('admin'), workshopController.createWorkshopRequest);

router.put("/update/:id", authenticateUser, authorizeRole('admin'), workshopController.updateWorkshopRequest);

router.delete("/delete/:id", authenticateUser, authorizeRole('admin'), workshopController.deleteWorkshopRequest);

module.exports = router;