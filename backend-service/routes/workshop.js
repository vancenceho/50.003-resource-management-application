const express = require("express");
const router = express.Router();
const workshopManagementController = require("../controller/workshopManagement");

/**
 * // Workshop Request Routes
 *
 * @details
 * Route 1: Route to get all workshop requests
 * Route 2: Route to get a specific workshop request by id
 * Route 3: Route to create a new workshop request
 * Route 4: Route to update a workshop request
 * Route 5: Route to delete a workshop request
 *
 * @returns
 * Route 1: Returns a 200 status code with the workshop requests data.
 * Route 2: Returns a 200 status code with the workshop request data.
 * Route 3: Returns a 200 status code with the new workshop request data.
 * Route 4: Returns a 200 status code with the updated workshop request data.
 * Route 5: Returns a 200 status code with the deleted workshop request data.
 *
 * Route 1 - 5: Returns a 500 status code with an error message if there is an error.
 *
 */
router.get("/", workshopManagementController.getWorkshopRequests);
router.get("/get/:id", workshopManagementController.getWorkshopRequestById);
router.post("/add/", workshopManagementController.createWorkshopRequest);
router.put("/update/:id", workshopManagementController.updateWorkshopRequest);
router.delete(
  "/delete/:id",
  workshopManagementController.deleteWorkshopRequest
);

module.exports = router;
