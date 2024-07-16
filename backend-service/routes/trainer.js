const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controller/leaveRequestController.js");
const trainerController = require("../controller/trainerController.js");

// Middleware Controller
const { authenticateUser, authorizeRole } = require("../middleware/auth");

/**
 * // Trainer Default Routes
 *
 * @details
 * Route 1: Route to create a new trainer
 * Route 2: Route to login as a trainer
 * Route 2: Route to get all trainers
 *
 * @returns
 * Route 1: Returns a 200 status code with the new trainer data.
 * Route 2: Returns a 200 status code with the trainer data.
 * Route 3: Returns a 200 status code with all the trainer data.
 *
 */
router.post("/createTrainer", trainerController.createTrainer);
//router.get("/trainerlogin", trainerController.Trainerlogin);
router.get("/getTrainers", trainerController.getAllTrainers);
router.get("/get/:id", trainerController.getTrainerById);
router.put("/update/:id", trainerController.updateTrainer);
router.delete("/delete/:id", trainerController.deleteTrainer);

/**
 * // Trainer Leave Request Routes
 *
 * @details
 * Route 1: Route to get a specific leave request by trainer id
 * Route 2: Route to submit a new leave request
 * Route 3: Route to update existing leave request
 * Route 4: Route to delete a leave request
 *
 * @returns
 * Route 1: Returns a 200 status code with the leave requests data.
 * Route 2: Returns a 200 status code with the new leave request data.
 * Route 3: Returns a 200 status code with the updated leave request data.
 * Route 4: Returns a 200 status code with the deleted leave request data.
 *
 */
router.get(
  "/get/:trainerId",
  authenticateUser,
  authorizeRole("trainer"),
  leaveRequestController.getLeaveRequestByTrainerId
);

router.post(
  "/submit/:trainerId",
  authenticateUser,
  authorizeRole("trainer"),
  leaveRequestController.createLeaveRequest
);

router.put(
  "/update/:_id",
  authenticateUser,
  authorizeRole("trainer"),
  leaveRequestController.updateLeaveRequest
);

router.delete(
  "/delete/:_id",
  authenticateUser,
  authorizeRole("trainer"),
  leaveRequestController.deleteLeaveRequest
);

module.exports = router;
