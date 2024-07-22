const Admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const secretKey = "root";

/**
 * // Admin Login
 *
 * @details
 * Step 1: This function first retrieves the username or email and password from the request body.
 * Step 2: It then attempts to find the admin with the given username or email in the database.
 * Step 3: If the admin is not found, it returns a 401 status code with an error message.
 * Step 4: If the admin is found, it compares the password with the hashed password in the database.
 * Step 5: If the password does not match, it returns a 401 status code with an error message.
 * Step 6: If the password matches, it generates a JWT token with the admin's role and userId.
 * Step 7: It returns a 200 status code with the token.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the admin is found and the password matches, returns a 200 status code with the token.
 * If the admin is not found, returns a 401 status code with an error message.
 * If the password does not match, returns a 401 status code with an error message.
 */
exports.adminLogin = async (req, res) => {
  console.log("TESTING...............1at.................");
  try {
    const credential = req.query.credential;
    const password = req.query.password;

    let query = {};
    if (credential.includes("@")) {
      query = { email: credential };
    } else {
      query = { username: credential };
    }

    const admin = await Admin.findOne(query);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found failed" });
    }
    const result = await bcrypt.compare(password, admin.password);
    if (!result) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    console.log("TESTING...............2at.................");
    const token = jwt.sign(
      {
        role: admin.role,
        userId: admin._id,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    console.log("TESTING...............3at.................");
    return res
      .status(200)
      .json({ message: "Authentication successful", token: token });
  } catch (error) {
    console.log("Error logging in admin: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

/**
 * // Admin Logout
 *
 * @details
 * Step 1: This function logs out the admin by invalidating the JWT token.
 * Step 2: It returns a 200 status code with a success message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with a success message.
 * If there is an error logging out the admin, returns a 500 status code with an error message.
 */
exports.adminLogout = async (req, res) => {
  try {
    console.log("TESTING...............3at.................");
    // TODO: Implement logout functionality
    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.error("Error logging out admin: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Get All Admins
 *
 * @details
 * Step 1: This function retrieves all the admins from the database.
 * Step 2: It then returns a 200 status code with the admins data.
 * Step 3: If there is an error fetching the admins, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the admins data.
 * If there is an error fetching the admins, returns a 500 status code with an error message.
 */
exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Create Admin user
 *
 * @details
 * Step 1: This function creates a new admin in the database.
 * Step 2: It first retrieves the username, firstName, lastName, email, password, and role from the request body.
 * Step 3: It then validates that all required fields are provided.
 * Step 4: It hashes the password before saving it to the database.
 * Step 5: It checks if an admin with the same username already exists.
 * Step 6: If an admin with the same username exists, it returns a 409 status code with an error message.
 * Step 7: If an admin with the same username does not exist, it creates a new admin instance.
 * Step 8: It then saves the admin to the database.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * If successful, returns a 200 status code with the created admin data.
 * If there is an error creating the admin, returns a 500 status code with an error message.
 * If required fields are not provided, returns a 400 status code with an error message.
 * If an admin with the same username already exists, returns a 409 status code with an error message.
 */
exports.createAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const { username, firstName, lastName, email, password, role } = req.body;
    // Validate that all required fields are provided
    if (!username || !firstName || !email || !password || !role) {
      return res.status(400).json({ message: "Fields required not filled" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if a user with the same userName already exists
    const existingAdmin = await Admin.findOne({ username: username });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exist" });
    }

    // Create a new user instance
    const admins = new Admin({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: role,
    });
    console.log("TESTING...............2at.................");
    // Save the user to the database
    await admins
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the admin.",
        });
      });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Update Admin
 *
 * @details
 * Step 1: This function first retrieves the id of the admin to be updated from the request params.
 * Step 2: It then attempts to find the admin with the given id in the database.
 * Step 3: If the admin is not found, it returns a 404 status code with an error message.
 * Step 4: If the admin is found, it updates the admin with the new data from the request body.
 * Step 5: It then saves the updated admin to the database.
 * Step 6: If successful, it returns a 200 status code with the updated admin data.
 * Step 7: If there is an error updating the admin, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the updated admin data.
 * If the admin is not found, returns a 404 status code with an error message.
 * If there is an error updating the admin, returns a 500 status code with an error message.
 */
// TODO: Implement update admin functionality

/**
 * // Delete Admin user
 *
 * @details
 * Step 1: This function first retrieves the id of the admin to be deleted from the request params.
 * Step 2: It then attempts to find the admin with the given id in the database.
 * Step 3: If the admin is not found, it returns a 404 status code with an error message.
 * Step 4: If the admin is found, it deletes the admin from the database.
 * Step 5: It then returns a 200 status code with the deleted admin data.
 * Step 6: If there is an error deleting the admin, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the deleted admin data.
 * If the admin is not found, returns a 404 status code with an error message.
 * If there is an error deleting the admin, returns a 500 status code with an error message.
 */
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    }
    const response = {
      code: 200,
      message: "Admin successfully deleted",
      admin: admin,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting admin: ", error);
    res
      .status(500)
      .json({ message: "Error Deleting Admin: Internal Server Error" });
  }
};

// Additional controller functions can be added here for other CRUD operations
