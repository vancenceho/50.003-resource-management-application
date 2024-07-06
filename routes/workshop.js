const express = require("express");
const router = express.Router();
const workshopManagementController = require("../controller/workshopManagement");

router.get("/", workshopManagementController.getWorkshopRequests);
router.get("/get/", workshopManagementController.getWorkshopRequestById);
router.post("/add/", workshopManagementController.createWorkshopRequest);
router.put("/update/", workshopManagementController.updateWorkshopRequest);
router.delete("/delete/", workshopManagementController.deleteWorkshopRequest);

module.exports = router;
