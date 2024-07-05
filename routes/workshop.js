const express = require("express");
const router = express.Router();
const workshopRequestController = require("../controller/workshopRequest");

router.get("/", workshopRequestController.getWorkshopRequests);
//router.get("/:id", workshopRequestController.getWorkshopRequest);
router.post("/add/", workshopRequestController.createWorkshopRequest);
router.put("/update/", workshopRequestController.updateWorkshopRequest);
router.delete("/delete/", workshopRequestController.deleteWorkshopRequest);

module.exports = router;
