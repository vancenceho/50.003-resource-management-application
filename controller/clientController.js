const Client = require('../models/client.js'); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const secretKey = "root";

// Controller function to create and save new client
exports.createClient = async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, userName, password, email , role} = req.body;
        // Validate that all required fields are provided
        if (!firstName || !lastName || !userName || !password || !email || !role){
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Check if a client with the same clientName already exists
        const existingClient = await Client.findOne({ userName: userName });
        if (existingClient) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        
        // Create a new user instance
        const clients = new Client({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: hashedPassword,
            email: email,
            role: role,
        });
        console.log("TESTING...............26at.................");
        // Save the client to the database
        await clients
            .save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the client.'
                });
            });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.clientLogin = async (req, res) => {
  console.log("TESTING..............clientlogin1..............");
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      return res.status(401).json({ message: "Client Authentication failed" });
    }
    console.log("TESTING...............clientlogin4.................");
    const result = await bcrypt.compare(req.body.password, client.password);
    if (!result) {
      return res.status(401).json({ message: "Client Authentication failed" });
    }
    console.log("TESTING...............clientlogin2.................");
    const token = jwt.sign(
      {
          role: client.role, 
          clientId: client._id,
        },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    console.log("TESTING...............clientlogin3.................");
    return res
      .status(200)
      .json({ message: "Client Authentication successful", token: token });
      
  } catch (error) {
    console.log("Error logging in client: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
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