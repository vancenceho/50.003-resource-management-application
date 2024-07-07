const Admin = require('../models/admin.js'); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
//const {authenticateUser, authorizeRole} = require('../middleware/auth');
const secretKey = "root";


// Controller function to create and save new user
exports.createAdmin = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, role } = req.body;
        // Validate that all required fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Check if a user with the same userName already exists
        const existingAdmin = await Admin.findOne({ name: name });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Insert Full Name' });
        }
        
        // Create a new user instance
        const admins = new Admin({
            name: name,
            //lastName: lastName,
            //userName: userName,
            email: email,
            password: hashedPassword,
            role: role,
        });
        console.log("TESTING...............2at.................");
        // Save the user to the database
        await admins
            .save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the user.'
                });
            });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.Adminlogin = async (req, res) => {
    console.log("TESTING...............1at.................");
    try {
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      const result = await bcrypt.compare(req.body.password, admin.password);
      if (!result) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      console.log("TESTING...............2at.................");
      const token = jwt.sign(
        {
          email: admin.email,
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

// Controller function to get all users
exports.getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(201).json(admins);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Additional controller functions can be added here for other CRUD operations
