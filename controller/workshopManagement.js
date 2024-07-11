const Workshop = require("../models/workshopRequest");
const Trainer = require("../models/trainer");
const mongoose = require("mongoose");

/**
 * // Get Workshop Requests
 *
 * @details
 * Step 1: This function retrieves all the workshop requests from the database.
 * Step 2: It then returns a 200 status code with the workshop requests data.
 * Step 3: If there is an error retrieving the workshop requests, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the workshop requests data.
 * If there is an error retrieving the workshop requests, returns a 500 status code with an error message.
 */
exports.getWorkshopRequests = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).json(workshops);
  } catch (error) {
    console.error("Error getting workshops: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Get Workshop Request by ID
 *
 * @details
 * Step 1: This function first retrieves the id of the workshop from the request query.
 * Step 2: It then attempts to find the workshop with the given id in the database.
 * Step 3: If the workshop is not found, it returns a 404 status code with an error message.
 * Step 4: If the workshop is found, it returns a 200 status code with the workshop data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the workshop is found, returns a 200 status code with the workshop data.
 * If the workshop is not found, returns a 404 status code with an error message.
 */
exports.getWorkshopRequestById = async (req, res) => {
  try {
    const id = req.query.id;
    const workshop = await Workshop.findById(id);
    if (!workshop) {
      res.status(404).json({ message: "Workshop not found" });
    }
    res.status(200).json(workshop);
  } catch (error) {
    console.error("Error getting workshop by id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Create Workshop Request
 *
 * @details
 * Step 1: This function first creates a new workshop object using the Workshop model.
 * Step 2: It then assigns the workshop properties from the request body.
 * Step 3: It saves the workshop object to the database.
 * Step 4: If successful, it returns a 201 status code with the created workshop data.
 * Step 5: If there is an error creating the workshop, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 201 status code with the created workshop data.
 * If there is an error creating the workshop, returns a 500 status code with an error message.
 */
exports.createWorkshopRequest = async (req, res) => {
  try {
    //console.log("TESTING...............5at.................");
    const workshop = new Workshop({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      location: req.body.location,
      duration: req.body.duration,
      status: req.body.status,
      type: req.body.type,
      maxParticipants: req.body.maxParticipants,
      trainerId: req.body.trainerId,
    });
    //console.log("TESTING...............6at.................");
    const data = await workshop.save();
    //console.log("TESTING...............7at.................");
    console.log("Workshop request created: ", data);
    res.status(201).json(data);
   
  } catch (error) {
    console.log("Error creating workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

/**
 * // Delete Workshop Request
 *
 * @details
 * Step 1: This function first retrieves the id of the workshop to be deleted from the request query.
 * Step 2: It then attempts to find the workshop with the given id in the database.
 * Step 3: If the workshop is not found, it returns a 404 status code with an error message.
 * Step 4: If the workshop is found, it deletes the workshop from the database and returns a 200 status code with the deleted workshop data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the deleted workshop data.
 * If the workshop is not found, returns a 404 status code with an error message.
 */
exports.deleteWorkshopRequest = async (req, res) => {
  try {
    //console.log("TESTING...............13.................");
    const id = req.query.id;
    const data = await Workshop.findByIdAndDelete(id);
    console.log(id);  
    console.log(data);  
    //console.log("TESTING...............14................");
    if (!data) {
      res.status(404).json({ message: "Workshop not found" });
    }
    res.status(200).json(data);
    console.log("Successfully deleting workshop request");
  } catch (error) {
    console.error("Error deleting workshop request: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Update Workshop Request
 *
 * @details
 * Step 1: This function first retrieves the id of the workshop to be updated from the request query.
 * Step 2: It then attempts to find the workshop with the given id in the database.
 * Step 3: If the workshop is not found, it returns a 404 status code with an error message.
 * Step 4: If the workshop is found, it updates the workshop properties from the request body.
 * Step 5: It then saves the updated workshop to the database.
 * Step 6: If successful, it returns a 200 status code with the updated workshop data.
 * Step 7: If there is an error updating the workshop, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the updated workshop data.
 * If the workshop is not found, returns a 404 status code with an error message.
 * If there is an error updating the workshop, returns a 500 status code with an error message.
 */
exports.updateWorkshopRequest = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    //console.log("TESTING...............10at.................");
    const data = await Workshop.findByIdAndUpdate(id, req.body, { new: true }); // Add { new: true } to return the updated document
    if (!data) {
      //console.log("TESTING...............11at.................");
      res.status(404).json({ message: "Workshop not found" });
    }
    //console.log("TESTING...............12at.................");
    res.status(200).json(data);
    
  } catch (error) {
    console.error("Error updating workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};


exports.allocateTrToWorkshop = async (req, res) => {
  try {
    const { workshopId, trainerIds } = req.query;

    console.log(workshopId);
    console.log(trainerIds);  
    
    if (!workshopId) {
      return res.status(400).json({ message: "Workshop ID is required" });
    }

    console.log("TESTING...............allocate..1.................")
    if (!trainerIds) {
      return res.status(400).json({ message: "Trainer IDs are required" });
    }

    // Split the trainer IDs string into an array
    const trainerIdsArray = trainerIds.split(",");

    // Find the workshop by ID
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    console.log("TESTING...............allocate..2.................")
    
    let allocatedTrainers = [];
    for (const trainerId of trainerIdsArray) {
      console.log(`Processing trainer ID: ${trainerId}`); // Log the current trainer ID being processed
      const trainer = await Trainer.findById(trainerId);
      if (!trainer) {
        console.log(`Trainer with ID ${trainerId} not found`); // Log if trainer not found
        res.status(404).json({ message: `Trainer with ID ${trainerId} not found`});
        continue;
      }
      if (!trainer.AvailabilityStatus) {
        console.log(`Trainer with ID ${trainerId} is not available`); // Log if trainer not available
        res.status(400).json({ message: `Trainer with ID ${trainerId} is not available` });
        continue;
      }
      console.log(`Adding trainer ID ${trainerId} to allocatedTrainers`); // Log successful addition
      allocatedTrainers.push(trainer._id);
      await trainer.save();
    }
    if (allocatedTrainers.length === 0) {
      console.log('No trainers were allocated. Check the conditions above.'); // Log if no trainers were added
    }
    // Allocate trainers to the workshop
    workshop.trainerId = allocatedTrainers;
    console.log(allocatedTrainers)
    // Save the updated workshop
    await workshop.save();
    console.log(workshop)

    // Respond with the updated workshop information
    res.json({ message: "Trainers allocated successfully", workshop });
  } catch (error) {
    console.error("Error allocating trainers to workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};


//update workshop status from pending to accepted or rejected
exports.updateWorkshopStatustoAcceptedorRejected = async (req, res) => {
  try {
    const workshopId = req.query.workshopId;

    console.log(workshopId);
    if (!workshopId) {
      return res.status(400).json({ message: "Workshop ID is required" });
    }

    // Find the workshop by ID and update its status
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    if (workshop.status !== 'pending') {
      return res.status(400).json({ message: "Workshop status is not pending" });
    }

    let updateStatus = {};
    if (workshop.trainerId) {
      updateStatus = { status: 'scheduled' };
    } else {
      updateStatus = { status: 'rejected' };
    }

    const updatedWorkshop = await Workshop.findByIdAndUpdate(workshopId, updateStatus, { new: true });

    if (!updatedWorkshop) {
      return res.status(400).json({ message: "Workshop status was not updated" });
    }

    res.json({ 
      message: `Workshop updated from pending to ${updatedWorkshop.status}`,
      workshop: updatedWorkshop 
    });
  } catch (error) {
    console.error("Error updating workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};


//trainer permission
exports.updateWorkshopStatustoComplete = async (req, res) => {
  try {
    const workshopId = req.query.workshopId;

    console.log(workshopId);
    if (!workshopId) {
      return res.status(400).json({ message: "Workshop ID is required" });
    }

    // Find the workshop by ID and update its status
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Check if the workshop is already in the desired state
    if (workshop.status === 'complete') {
      return res.status(400).json({ message: "Workshop is already marked as complete" });
    }

    if (workshop.status === 'accepted') {
      // Assuming the status you want to change is from 'accepted' to 'complete'
      await Workshop.findByIdAndUpdate(workshopId, { status: 'complete' });

    }

    res.json({ message: "Workshop marked as complete" });
  } catch (error) {
    console.error("Error updating workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

