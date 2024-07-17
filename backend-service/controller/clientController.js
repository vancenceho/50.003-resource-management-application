const Client = require("../models/client.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Controller function to create and save new user
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
    const existingClient = await Client.findOne({ username: username });
    if (existingClient) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Create a new user instance
    const clients = new Client({
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
    await clients
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

// Controller function to get all clients
exports.getAllClients = async (req, res) => {
  try {
      const clients = await Client.find();
      res.status(201).json(clients);
  } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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

    const client = await Client.findOne(query);
    if (!client) {
      return res.status(401).json({ message: "Client not found" });
    }

    const passwordMatch = await bcrypt.compare(password, client.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error logging in client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.clientLogout = async (req, res) => {
  try {
    // TODO: Implement logout functionality
    res.status(200).json({ message: "Client logged out" });
  } catch (error) {
    console.error("Error logging out client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Additional controller functions can be added here for other CRUD operations
exports.getClientById = async (req, res) => {
  try {
    const id = req.query.id;
    const client = await Client.findById(id);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Error getting client by id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateClient = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    console.log("TESTING...............10at.................");
    const data = await Client.findByIdAndUpdate(id, req.body, { new: true }); // Add { new: true } to return the updated document
    if (!data) {
      console.log("TESTING...............11at.................");
      res.status(404).json({ message: "Client not found" });
    }
    console.log("TESTING...............12at.................");
    res.status(200).json(data);

  } catch (error) {
    console.error("Error updating client details: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });

    }
  }
};


exports.deleteClient = async (req, res) => {
  try {
    console.log("TESTING...............13.................");
    const id = req.query.id;
    const data = await Client.findByIdAndDelete(id);
    console.log(id);  
    console.log(data);  
    console.log("TESTING...............14................");
    if (!data) {
      res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(data);
    console.log("Successfully deleting client details");
  } catch (error) {
    console.error("Error deleting client details: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};