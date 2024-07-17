const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientController.js"); // Import the user controller
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
 * Route 1: Returns a 200 status code with the client login data.
 * Route 2: Returns a 200 status code with the clients data.
 * Route 3: Returns a 200 status code with the new client data.
 *
 */
router.get("/clientLogin", clientController.clientLogin);
router.get("/getclient", clientController.getAllClients);
router.post("/addclient", clientController.createClient);

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
router.post( "/addworkshop", authenticateUser, authorizeRole("client"), workshopController.createWorkshopRequest);
router.get("/getworkshop:id", authenticateUser, authorizeRole("client"), workshopController.getWorkshopRequestById);

/*
// not done yet---------------------------------------------------
router.get("/editClientRequest", clientController.editClientRequest);
router.get("/editWorkshopDetails", authenticateUser, authorizeRole("client"), workshopController.editWorkshopDetails);
*/



module.exports = router;