const Client = require("../models/client.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

/**
 * // Client Login
 *
 * @details
 * Step 1: This function first retrieves the username or email and password from the request query.
 * Step 2: It then attempts to find the client with the given username or email in the database.
 * Step 3: If the client is not found, it returns a 401 status code with an error message.
 * Step 4: If the client is found, it compares the password with the hashed password in the database.
 * Step 5: If the password does not match, it returns a 401 status code with an error message.
 * Step 6: If the password matches, it returns a 200 status code with the client data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the client is found and the password matches, returns a 200 status code with the client data.
 * If the client is not found, returns a 401 status code with an error message.
 * If the password does not match, returns a 401 status code with an error message.
 * If there is an error logging in the client, returns a 500 status code with an error message.
 */
exports.clientLogin = async (req, res) => {
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

    const user = await Client.findOne(query);
    if (!user) {
      return res.status(401).json({ message: "Client not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Client Logout
 *
 * @details
 * Step 1: This function logs out the client user.
 * Step 2: It returns a 200 status code with a success message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * Returns a 200 status code with a success message.
 * If there is an error logging out the user, returns a 500 status code with an error message.
 */
exports.clientLogout = async (req, res) => {
  try {
    // TODO: Implement logout functionality
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Get all Client users
 *
 * @details
 * Step 1: This function retrieves all the client users from the database.
 * Step 2: It then returns a 200 status code with the client users data.
 * Step 3: If there is an error retrieving the client users, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the client users data.
 * If there is an error retrieving the client users, returns a 500 status code with an error message.
 */
exports.getAllClients = async (req, res) => {
  try {
    const users = await Client.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Create Client user
 *
 * @details
 * Step 1: This function creates a new client user in the database.
 * Step 2: It first retrieves the username, firstName, lastName, email, password, and role from the request body.
 * Step 3: It then validates that all required fields are provided.
 * Step 4: It hashes the password before saving it to the database.
 * Step 5: It checks if a user with the same username already exists.
 * Step 6: If a user with the same username exists, it returns a 409 status code with an error message.
 * Step 7: If a user with the same username does not exist, it creates a new user instance.
 * Step 8: It then saves the user to the database.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the created user data.
 * If there is an error creating the user, returns a 500 status code with an error message.
 * If required fields are not provided, returns a 400 status code with an error message.
 * If a user with the same username already exists, returns a 409 status code with an error message.
 */
exports.createClient = async (req, res) => {
  try {
    console.log(req.body);
    const { username, firstName, lastName, email, password, role } = req.body;
    // Validate that all required fields are provided
    if (!username || !firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if a user with the same userName already exists
    const existingUser = await Client.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or Email already exists" });
    }

    // Create a new user instance
    const users = new Client({
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
    await users
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Get Client user by ID
 *
 * @details
 * Step 1: This function retrieves the id of the user from the request query.
 * Step 2: It then attempts to find the user with the given id in the database.
 * Step 3: If the user is not found, it returns a 404 status code with an error message.
 * Step 4: If the user is found, it returns a 200 status code with the user data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the user is found, returns a 200 status code with the user data.
 * If the user is not found, returns a 404 status code with an error message.
 * If there is an error getting the user, returns a 500 status code with an error message.
 */
exports.getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Error getting client by id:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Update Client user
 *
 * @details
 * Step 1: This function retrieves the id of the user from the request query.
 * Step 2: It then attempts to find the user with the given id in the database.
 * Step 3: If the user is not found, it returns a 404 status code with an error message.
 * Step 4: If the user is found, it updates the user details with the new data.
 * Step 5: It then saves the updated user to the database.
 * Step 6: If there is an error saving the updated user, it returns a 500 status code with an error message.
 * Step 7: If successful, it returns a 200 status code with the updated user data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the user is found, returns a 200 status code with the updated user data.
 * If the user is not found, returns a 404 status code with an error message.
 * If there is an error saving the updated user, returns a 500 status code with an error message.
 */
exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, password, ...updateData } = req.body; // exclude _id and password from update data
    const data = await Client.findByIdAndUpdate(id, updateData);
    if (!data) {
      res.status(404).json({ message: "Client not found" });
    }
    const response = {
      code: 200,
      message: "Client successfully updated",
      client: updateData,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating client:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

/**
 * // Delete Client user
 *
 * @details
 * Step 1: This function retrieves the id of the user from the request query.
 * Step 2: It then attempts to find the user with the given id in the database.
 * Step 3: If the user is not found, it returns a 404 status code with an error message.
 * Step 4: If the user is found, it deletes the user from the database.
 * Step 5: If there is an error deleting the user, it returns a 500 status code with an error message.
 * Step 6: If successful, it returns a 200 status code with the deleted user data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the deleted user data.
 * If the user is not found, returns a 404 status code with an error message.
 * If there is an error deleting the user, returns a 500 status code with an error message.
 */
exports.deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Client.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({ message: "Client not found" });
    }
    const response = {
      code: 200,
      message: "Client successfully deleted",
      client: data,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Additional controller functions can be added here for other CRUD operations