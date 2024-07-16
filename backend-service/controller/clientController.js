const User = require("../models/client.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Controller function to create and save new user
exports.createUser = async (req, res) => {
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
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Create a new user instance
    const users = new User({
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

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.clientLogout = async (req, res) => {
  try {
    // TODO: Implement logout functionality
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Additional controller functions can be added here for other CRUD operations
