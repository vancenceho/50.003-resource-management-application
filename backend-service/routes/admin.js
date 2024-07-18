const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshopManagement");
const adminController = require("../controller/adminController");

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
 * Route 1 - 5: Returns a 500 status code with an error message if there is an error.
 *
 */
router.get(
  "/",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.getWorkshopRequests
);

router.get(
  "/get/:id",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.getWorkshopRequestById
);

router.post(
  "/add",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.createWorkshopRequest
);

router.put(
  "/update/:id",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.updateWorkshopRequest
);

router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRole("admin"),
  workshopController.deleteWorkshopRequest
);

module.exports = router;
