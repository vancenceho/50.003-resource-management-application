const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshopManagement");
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
router.get("/login", adminController.adminLogin);
router.get("/getAdmins", adminController.getAllAdmin);
router.get("/logout", adminController.adminLogout);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRole("admin"),
  adminController.deleteAdmin
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
 *
 * @returns
 * Route 1: Returns a 200 status code with the workshop requests data.
 * Route 2: Returns a 200 status code with the workshop request data.
 * Route 3: Returns a 200 status code with the new workshop request data.
 * Route 4: Returns a 200 status code with the updated workshop request data.
 * Route 5: Returns a 200 status code with the deleted workshop request data.
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
  clientController.getAllUsers
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
  clientController.createUser
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

module.exports = router;
