const User = require('../models/client.js'); 
const bcrypt = require('bcryptjs');


// Controller function to create and save new user
exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, userName, password, email } = req.body;
        // Validate that all required fields are provided
        if (!firstName || !lastName || !userName || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Check if a user with the same userName already exists
        const existingUser = await User.findOne({ userName: userName });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        
        // Create a new user instance
        const users = new User({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: hashedPassword,
            email: email,
        });
        console.log("TESTING...............2at.................");
        // Save the user to the database
        await users
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

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Additional controller functions can be added here for other CRUD operations
