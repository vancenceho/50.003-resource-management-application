const Trainer = require('../models/trainer.js'); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secretKey = "root";

// Controller function to create and save new user
exports.createTrainer = async (req, res) => {
  try {
    console.log(req.body);
    const { username, firstName, lastName, email, password } = req.body;
    // Validate that all required fields are provided
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if a trainer with the same userName already exists
    const existingTrainer = await Trainer.findOne({ username: username });
    if (existingTrainer) {
      return res
        .status(409)
        .json({ message: "Trainer Username already exists" });
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
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.trainerLogin = async (req, res) => {
  try {
    const credential = req.query.credential;
    const password = req.query.password;

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
        userId: trainer._id,
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


// Controller function to get all trainers
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(201).json(trainers);
    } catch (error) {
        console.error('Error fetching trainers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to let the signed in trainer access only their details
exports.getOwnDetails = async (req, res) => {
    try {
        const trainer = await Trainer.findOne({ userName: req.params.userName });
        if (!trainer) {
          return res.status(404).send({ message: 'Trainer not found' });
        }
        res.status(200).json(trainer);
      } catch (error) {
        res.status(500).send({ message: 'Server error' });
      }
    };

