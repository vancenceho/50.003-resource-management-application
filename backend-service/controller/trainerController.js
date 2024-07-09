const Trainer = require("../models/trainer.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "root";

// Controller function to create and save new user
exports.createTrainer = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, userName, password, email } = req.body;
    // Validate that all required fields are provided
    if (!fullName || !userName || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if a trainer with the same userName already exists
    const existingTrainer = await Trainer.findOne({ userName: userName });
    if (existingTrainer) {
      return res
        .status(409)
        .json({ message: "Trainer Username already exists" });
    }

    // Create a new user instance
    const trainers = new Trainer({
      fullName: fullName,
      userName: userName,
      password: hashedPassword,
      email: email,
    });
    console.log("TESTING...............2at.................");
    // Save the trainer details to the database
    await trainers
      .save()
      .then((data) => {
        res.send(data);
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

// Controller function to get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(201).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

// Controller function to let the signed in trainer to submit a leave request
exports.submitLeaveRequest = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userName: req.params.userName });
    if (!trainer) {
      return res.status(404).send({ message: "Trainer not found" });
    }
    trainer.leaveRequests.push(req.body);
    await trainer.save();
    res.status(201).send({ message: "Leave request submitted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
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
