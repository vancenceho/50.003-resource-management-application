const express = require('express');
const bcrypt = require('bcrypt');
const clientmodel = require('../models/client.js');
var router = express.Router();
const mongoose = require('mongoose');

// Middleware to parse JSON bodies
router.use(express.json());

// POST request to add a new department
router.post('/', async function(req, res, next) {
    try {
        const { userID, passwd } = req.body;
        
        // Validate that code is provided
        if (!userID || !passwd) {
            return res.status(400).send('userID and passwd is required');
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(passwd, 10);

        // Create a client object called client
        const client = new clientmodel.Client({ userID, passwd: hashedPassword});
        //await clientmodel.insertMany([client]);

        // Save the client document to the database
        await client.save();
        
        // Find and return the newly inserted department
        //const output = await clientmodel.find({ client, userID  });
       // const clientInstances = await clientmodel.find().exec();
        res.json(client);

    } catch (error) {
        // Handle any errors that occurred during the process
        console.error(error);
        res.status(500).send('An error occurred while adding the client');
    }
});



/* GET all clients */
router.get('/', async function(req, res, next) {
    try {
        const clients = await clientmodel.find({}, 'userID'); // Only return the userID
        res.json(clients);
    } catch (error) {
        console.error("Failed to retrieve clients: ", error);
        res.status(500).send('An error occurred while retrieving the clients');
    }
});

module.exports = router;
