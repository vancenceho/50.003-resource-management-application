const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshopManagement");
const leaveRequestController = require("../controller/leaveRequestController");
const clientController = require("../controller/clientController");
const adminController = require("../controller/adminController");
const trainerController = require("../controller/trainerController");

// Middleware Controller
const { authenticateUser, authorizeRole } = require("../middleware/auth");

/**
 * // Admin Default Routes
 *
 * @details
 * Route 1: Route to create a new admin
 * Route 2: Route to login as an admin
 * Route 3: Route to get all admins
 * Route 4: Route to logout as an admin
 *
 * @returns
 * Route 1: Returns a 200 status code with the new admin data.
 * Route 2: Returns a 200 status code with a message that authentication was successful.
 * Route 3: Returns a 200 status code with all the admin data.
 * Route 4: Returns a 200 status code with a message that the admin has logged out.
 * Route 5: Returns a 200 status code with the deleted admin data.
 *
 * @throws
 * Route 1 - 5: Returns a 500 status code with an error message if there is an error.
 *
 */
router.post(
  "/createAdmin",
  authenticateUser,
  authorizeRole("admin"),
  adminController.createAdmin
);
router.post("/login", adminController.adminLogin);
router.get(
  "/getAdmins",
  authenticateUser,
  authorizeRole("admin"),
  adminController.getAllAdmin
);
router.post("/logout", adminController.adminLogout);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRole("admin"),
  adminController.deleteAdmin
);

/**
 * // Admin Trainer Request Routes
 *
 * @details
 * Route 1: Route to get all trainer details
 * Route 2: Route to get a specific trainer detail by id
 * Route 3: Route to create a new trainer
 * Route 4: Route to update a trainer details
 * Route 5: Route to delete a trainer
 * Route 6: Route to get check if trainer is available (check for trainer's sched conflict)
 *
 * @returns
 * Route 1: Returns a 200 status code with the trainer details data.
 * Route 2: Returns a 200 status code with the trainer detail data.
 * Route 3: Returns a 200 status code with the new trainer data.
 * Route 4: Returns a 200 status code with the updated trainer data.
 * Route 5: Returns a 200 status code with the deleted trainer data.
 * Route 6: Returns a 200 status code with the trainer's availability status.
 *
 * @throws
 * Route 1 - 7: Returns a 500 status code with an error message if there is an error.
 */
router.get(
  "/gettrainer",
  authenticateUser,
  authorizeRole("admin"),
  trainerController.getAllTrainers
);
router.get(
  "/gettrainer/:id",
  authenticateUser,
  authorizeRole("admin"),
  trainerController.getTrainerById
);
router.post(
  "/addtrainer",
  authenticateUser,
  authorizeRole("admin"),
  trainerController.createTrainer
);
router.put(
  "/updatetrainer/:id",
  authenticateUser,
  authorizeRole("admin"),
  trainerController.updateTrainer
);
router.delete(
  "/deletetrainer/:id",
  authenticateUser,
  authorizeRole("admin"),
  trainerController.deleteTrainer
);
router.get(
  "/checktraineravailability/:id",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.checkforSchedConflict
);

/**
 * // Admin Client Request Routes
 *
 * @details
 * Route 1: Route to get all client details
 * Route 2: Route to get a specific client detail by id
 * Route 3: Route to create a new client
 * Route 4: Route to update a client details
 * Route 5: Route to delete a client
 *
 * @returns
 * Route 1: Returns a 200 status code with the client details data.
 * Route 2: Returns a 200 status code with the client detail data.
 * Route 3: Returns a 200 status code with the new client data.
 * Route 4: Returns a 200 status code with the updated client data.
 * Route 5: Returns a 200 status code with the deleted client data.
 *
 * @throws
 * Route 1 - 5: Returns a 500 status code with an error message if there is an error.
 */
router.get(
  "/getclient",
  authenticateUser,
  authorizeRole("admin"),
  clientController.getAllClients
);
router.get(
  "/getclient/:id",
  authenticateUser,
  authorizeRole("admin"),
  clientController.getClientById
);
router.post(
  "/addclient",
  authenticateUser,
  authorizeRole("admin"),
  clientController.createClient
);
router.put(
  "/updateclient/:id",
  authenticateUser,
  authorizeRole("admin"),
  clientController.updateClient
);
router.delete(
  "/deleteclient/:id",
  authenticateUser,
  authorizeRole("admin"),
  clientController.deleteClient
);

/**
 * // Admin Workshop Request Routes
 *
 * @details
 * Route 1: Route to get all workshop requests
 * Route 2: Route to get a specific workshop request by id
 * Route 3: Route to create a new workshop request
 * Route 4: Route to update a workshop request
 * Route 5: Route to delete a workshop request
 * Route 6: Route to allocate a trainer to a workshop
 *
 * @returns
 * Route 1: Returns a 200 status code with the workshop requests data.
 * Route 2: Returns a 200 status code with the workshop request data.
 * Route 3: Returns a 200 status code with the new workshop request data.
 * Route 4: Returns a 200 status code with the updated workshop request data.
 * Route 5: Returns a 200 status code with the deleted workshop request data.
 * Route 6: Returns a 200 status code with the allocated trainer data.
 *
 * @throws
 * Route 1 - 5: Returns a 500 status code with an error message if there is an error.
 *
 */
router.get(
  "/getworkshop",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.getWorkshopRequests
);

router.get(
  "/getworkshop/:id",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.getWorkshopRequestById
);

router.post(
  "/addworkshop",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.createWorkshopRequest
);

router.put(
  "/updateworkshop/:id",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.updateWorkshopRequest
);

router.delete(
  "/deleteworkshop/:id",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.deleteWorkshopRequest
);

router.post(
  "/alloctrainertoworkshop",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.allocateTrToWorkshop
);

/**
 * // Admin Leave Request Routes
 *
 * @details
 * Route 1: Route to get all leave requests
 * Route 2: Route to get a specific leave request by trainer id
 * Route 3: Route to get leave requests by trainer username
 * Route 4: Route to create a new leave request
 * Route 5: Route to update a leave request
 * Route 6: Route to delete a leave request
 *
 * @returns
 * Route 1: Returns a 200 status code with the leave requests data.
 * Route 2: Returns a 200 status code with all the leave requests data associated with the specific trainer id.
 * Route 3: Returns a 200 status code with all leave requests data associated with the specific trainer.
 * Route 4: Returns a 200 status code with the new leave request data.
 * Route 5: Returns a 200 status code with the updated leave request data.
 * Route 6: Returns a 200 status code with the deleted leave request data.
 *
 * @throws
 * Route 1 - 5: Returns a 500 status code with an error message if there is an error.
 */
router.get(
  "/getleave",
  authenticateUser,
  authorizeRole("admin"),
  leaveRequestController.getLeaveRequests
);

/**
 * @@todo Add route to get leave request by trainer username
 */

router.get(
  "/getleave/:id",
  authenticateUser,
  authorizeRole("admin"),
  leaveRequestController.getLeaveRequestByTrainerId
);

router.post(
  "/addleave",
  authenticateUser,
  authorizeRole("admin"),
  leaveRequestController.createLeaveRequest
);

router.put(
  "/updateleave/:id",
  authenticateUser,
  authorizeRole("admin"),
  leaveRequestController.updateLeaveRequest
);

router.delete(
  "/deleteleave/:id",
  authenticateUser,
  authorizeRole("admin"),
  leaveRequestController.deleteLeaveRequest
);
module.exports = router;

/**
 * // Admin Dashboard Routes
 *
 * @details
 * Route 1: Route to get the number of past and present workshops allocated for each trainer
 * Route 2: Route to get the trend of deal sizes for workshops within a specified date range.
 *
 * @returns
 * Route 1: Returns a 200 status code with the trainer-workshop count data.
 * Route 2: Returns a 200 status code with the average deal size trend data.
 *
 * @throws
 * Route 1 - 5: Returns a 500 status code with an error message if there is an error.
 * */

router.get(
  "/dashboard/workshopscount",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.getWorkshopsCountForTrainers
);

router.get(
  "/dashboard/getdealsizetrend",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.getDealSizeTrend
);

router.get(
  "/dashboard/aggregateworkshopsbystatus",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.aggregateWorkshopsByStatus
);
