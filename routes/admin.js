const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshopManagement");
const authController = require("../controller/auth");

router.get("/", authController.verifyToken, workshopController.getWorkshops);
router.get(
  "/get/",
  authController.verifyToken,
  workshopController.getWorkshopById
);
router.post(
  "/add/",
  authController.verifyToken,
  workshopController.createWorkshop
);
router.put(
  "/update/",
  authController.verifyToken,
  workshopController.updateWorkshop
);
router.delete(
  "/delete/",
  authController.verifyToken,
  workshopController.deleteWorkshop
);

module.exports = router;
