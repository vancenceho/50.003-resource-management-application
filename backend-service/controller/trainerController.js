const Trainer = require("../models/trainer.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const secretKey = "root";

/**
 * // Trainer Login
 *
 * @details
 * Step 1: This function first retrieves the username or email and password from the request query.
 * Step 2: It then attempts to find the trainer with the given username or email in the database.
 * Step 3: If the trainer is not found, it returns a 401 status code with an error message.
 * Step 4: If the trainer is found, it compares the password with the hashed password in the database.
 * Step 5: If the password does not match, it returns a 401 status code with an error message.
 * Step 6: If the password matches, it returns a 200 status code with a success message and a token.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the trainer is found and the password matches, returns a 200 status code with a success message and a token.
 * If the trainer is not found, returns a 401 status code with an error message.
 * If the password does not match, returns a 401 status code with an error message.
 * If there is an error logging in the trainer, returns a 500 status code with an error message.
 */
exports.trainerLogin = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const credential = req.query.credential;
    const password = req.query.password;
    // Check if credential and password are provided
    if (!credential || !password) {
      return res
        .status(400)
        .json({ message: "Credential and password are required" });
    }

    let query = {};
    if (credential.includes("@")) {
      query = { email: credential };
    } else {
      query = { username: credential };
    }

    const trainer = await Trainer.findOne(query);

    if (!trainer) {
      return res.status(401).json({ message: "Incorrect username or email." });
    }
    const result = await bcrypt.compare(password, trainer.password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        role: trainer.role,
        TrainerId: trainer._id,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    return res
      .status(200)
      .json({ message: "Authentication successful", token: token });
  } catch (error) {
    console.error("Error logging in trainer: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

/**
 * // Trainer Logout
 *
 * @details
 * Step 1: This function logs out the trainer user.
 * Step 2: It returns a 200 status code with a success message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * Returns a 200 status code with a success message.
 * If there is an error logging out the user, returns a 500 status code with an error message.
 */
exports.trainerLogout = async (req, res) => {
  try {
    // TODO: Implement logout functionality
    res.status(200).json({ message: "Trainer logged out" });
  } catch (error) {
    console.error("Error logging out trainer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Get all Trainer users
 *
 * @details
 * Step 1: This function retrieves all the trainer users from the database.
 * Step 2: It then returns a 200 status code with the trainer users data.
 * Step 3: If there is an error retrieving the trainer users, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the trainer users data.
 * If there is an error retrieving the trainer users, returns a 500 status code with an error message.
 *
 */
exports.getAllTrainers = async (req, res) => {
  let response = {};
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error fetching trainers:", error);
    res.status(500).json(response);
  }
};

/**
 * // Get Trainer by trainerId
 *
 * @details
 * Step 1: This function first retrieves the id of the trainer from the request query.
 * Step 2: It then attempts to find the trainer with the given id in the database.
 * Step 3: If the trainer is not found, it returns a 404 status code with an error message.
 * Step 4: If the trainer is found, it returns a 200 status code with the trainer data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the trainer is found, returns a 200 status code with the trainer data.
 * If the trainer is not found, returns a 404 status code with an error message.
 * If there is an error retrieving the trainer, returns a 500 status code with an error message.
 */
exports.getTrainerById = async (req, res) => {
  let response = {};
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      response = {
        code: 404,
        type: "validation error",
        message: "Trainer not found",
      };
      return res.status(404).send(response);
    }
    res.status(200).json(trainer);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    res.status(500).send(response);
  }
};
// Controller function to let the signed in trainer access only their details
exports.getOwnDetails = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userName: req.params.userName });
    if (!trainer) {
      return res.status(404).send({ message: "Trainer not found" });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

/**
 * // Create Trainer user
 *
 * @details
 * Step 1: This function creates a new trainer user.
 * Step 2: It first validates that all required fields are provided.
 * Step 3: It then hashes the password before saving.
 * Step 4: It checks if a trainer with the same username already exists.
 * Step 5: If the trainer already exists, it returns a 409 status code with an error message.
 * Step 6: If the trainer does not exist, it creates a new trainer instance and saves it to the database.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the trainer data.
 * If there is an error creating the trainer, returns a 500 status code with an error message.
 * If required fields are not provided, returns a 400 status code with an error message.
 * If a trainer with the same username already exists, returns a 409 status code with an error message.
 */
exports.createTrainer = async (req, res) => {
  let response = {};
  try {
    console.log(req.body);
    const { username, firstName, lastName, email, password } = req.body;
    // Validate that all required fields are provided
    if (!username || !firstName || !lastName || !email || !password) {
      response = {
        code: 400,
        type: "validation error",
        message: "All fields are required",
      };
      return res.status(400).json(response);
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if a trainer with the same username or email already exists
    const existingTrainer = await Trainer.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingTrainer) {
      response = {
        code: 409,
        type: "validation error",
        message: "Trainer username already exists",
      };
      return res.status(409).json(response);
    }

    // Create a new user instance
    const trainers = new Trainer({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: "trainer",
      status: "available",
    });
    console.log("TESTING...............2at.................");
    // Save the trainer details to the database
    await trainers
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
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error creating user:", error);
    res.status(500).json(response);
  }
};

/**
 * // Update Trainer user
 *
 * @details
 * Step 1: This function first retrieves the id of the trainer to be updated from the request query.
 * Step 2: It then attempts to find the trainer with the given id in the database.
 * Step 3: If the trainer is not found, it returns a 404 status code with an error message.
 * Step 4: If the trainer is found, it updates the trainer details with the new data.
 * Step 5: It then saves the updated trainer to the database.
 * Step 6: If successful, it returns a 200 status code with the updated trainer data.
 * Step 7: If there is an error updating the trainer, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the updated trainer data.
 * If the trainer is not found, returns a 404 status code with an error message.
 * If there is an error updating the trainer, returns a 500 status code with an error message.
 */
exports.updateTrainer = async (req, res) => {
  let response = {};
  try {
    const query = { _id: req.params.id };
    let updateData = req.body;
    delete updateData._id;
    const update = { $set: updateData };
    const options = { new: true, upsert: false };
    const trainer = await Trainer.findOneAndUpdate(query, update, options);
    if (!trainer) {
      response = {
        code: 404,
        type: "validation error",
        message: "Trainer not found",
      };
      return res.status(404).send(response);
    }
    response = {
      code: 200,
      type: "success",
      message: "Trainer updated successfully",
      data: trainer,
    };
    res.status(200).json(response);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    res.status(500).send(response);
  }
};

/**
 * // Delete Trainer user
 *
 * @details
 * Step 1: This function first retrieves the id of the trainer to be deleted from the request query.
 * Step 2: It then attempts to find the trainer with the given id in the database.
 * Step 3: If the trainer is not found, it returns a 404 status code with an error message.
 * Step 4: If the trainer is found, it deletes the trainer from the database and returns a 200 status code with the deleted trainer data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the deleted trainer data.
 * If the trainer is not found, returns a 404 status code with an error message.
 * If there is an error deleting the trainer, returns a 500 status code with an error message.
 */
exports.deleteTrainer = async (req, res) => {
  let response = {};
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      response = {
        code: 404,
        type: "validation error",
        message: "Trainer not found",
      };
      return res.status(404).send(response);
    }
    response = {
      code: 200,
      type: "success",
      message: "Trainer deleted successfully",
      data: trainer,
    };
    res.status(200).json(response);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    res.status(500).send(response);
  }
};

//updateWorkshopAllocation
//checkScheduleConflicts
//getTrainerList
//markWorkoutAsComplete
//updateAvailabilityStatus
//updateLeaveStatus
//notfifyLeaveRequestStatus
//retreiveWorkshopDetails
//retrieveallLeaveRequests
//selectWorkshop
//validateTrainer
//maekWorkshopAsComplete
