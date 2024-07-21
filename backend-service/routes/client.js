const express = require("express");
const router = express.Router();
const userController = require("../controller/clientController.js"); // Import the user controller
const workshopController = require("../controller/workshopManagement.js"); // Import the workshop controller

const { authenticateUser, authorizeRole } = require("../middleware/auth.js"); // Import the authentication middleware

/**
 * // Client Default Routes
 *
 * @details
 * Route 1: Route to login a client
 * Route 2: Route to get all users
 * Route 3: Route to create a new client
 *
 * @returns
 * Route 1: Returns a 200 status code with a message login successful & a token.
 * Route 2: Returns a 200 status code with a message logout successful.
 * Route 3: Returns a 200 status code with the clients data.
 * Route 4: Returns a 200 status code with the new client data.
 *
 */
router.get("/login", userController.clientLogin);
router.get("/logout", userController.clientLogout);
router.get("/getClients", userController.getAllUsers); // This route should not be accessible to clients
router.post("/createClient", userController.createUser);

/**
 * // Workshop Request Routes
 *
 * @details
 * Route 1: Route to get all client specific workshop requests
 * Route 2: Route to create a new workshop request
 *
 * @returns
 * Route 1: Returns a 200 status code with the client specific workshop requests data.
 * Route 2: Returns a 200 status code with the new workshop request data.
 *
 */
router.post(
  "/add",
  authenticateUser,
  authorizeRole("client"),
  workshopController.createWorkshopRequest
);
router.get(
  "/get:id",
  authenticateUser,
  authorizeRole("client"),
  workshopController.getWorkshopRequestById
);

module.exports = router;
