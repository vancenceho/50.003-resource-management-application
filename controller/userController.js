const User = require('../models/Post.js'); 
const bcrypt = require('bcrypt');

// Controller function to create and save new user
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, password, email } = req.body;

        // Validate that all required fields are provided
        if (!firstName || !lastName || !userName || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: hashedPassword,
            email: req.body.email,
        });

        // Save the user to the database
        const savedUser = await user.create(user);
        res.status(201).json(savedUser);
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
