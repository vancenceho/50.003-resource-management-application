const Trainer = require('../models/trainer.js'); 
const bcrypt = require('bcryptjs');


// Controller function to create and save new trainer
exports.createTrainer = async (req, res) => {
    try {
        console.log(req.body);
        const { fullName, userName, password, email, AvailabilityStatus, role } = req.body;
        // Validate that all required fields are provided
        if ( !fullName || !userName || !password || !email || !AvailabilityStatus  || !role ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Check if a trainer with the same userName already exists
        const existingTrainer = await Trainer.findOne({ userName: userName });
        if (existingTrainer) {
            return res.status(409).json({ message: 'Trainer Username already exists' });
        }
        
        // Create a new trainer instance
        const trainers = new Trainer({
            fullName: fullName,
            userName: userName,
            password: hashedPassword,
            email: email,
            AvailabilityStatus: AvailabilityStatus,
            role: role,
        });
        console.log("TESTING...............1createtrainer.................");
        // Save the trainer details to the database
        await trainers
            .save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the trainer.'
                });
            });
    } catch (error) {
        console.error('Error creating trainer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.Trainerlogin = async (req, res) => {
    console.log("TESTING...............1trainerlogin.................");
    try {
      const trainer = await Trainer.findOne({
        $or: [
          // trainer have the option of using email or username to login
          { email: req.body.email },
          { userName: req.body.userName }
        ]
      });
      if (!trainer) {
        return res.status(401).json({ message: "Trainer Authentication failed" });
      }
      const result = await bcrypt.compare(req.body.password, admin.password);
      if (!result) {
        return res.status(401).json({ message: "Trainer Authentication failed" });
      }
      console.log("TESTING...............21trainerlogin.................");
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
      console.log("TESTING...............3trainerlogin.................");
      return res
        .status(200)
        .json({ message: "Trainer Authentication successful", token: token });
        
    } catch (error) {
      console.log("Error logging in trainer: ", error);
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

//updateWorkshopAllocation
//checkScheduleConflicts
//getTrainerList
//markWorkoutAsComplete
//submitLeaveRequest
//updateAvailabilityStatus
//updateLeaveStatus
//notfifyLeaveRequestStatus
//retreiveWorkshopDetails
//retrieveallLeaveRequests
//selectWorkshop
//validateTrainer
//maekWorkshopAsComplete

