const Workshop = require("../models/workshopRequest");
const Trainer = require("../models/trainer");
const mongoose = require("mongoose");
const moment = require("moment");
require("moment-parseformat"); // Ensure you require the plugin

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
    const workshops = await Workshop.find()
      .populate("client")
      .populate("trainer");
    res.status(200).json(workshops);
    console.log(workshops);
  } catch (error) {
    const response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error getting workshops: ", error);
    res.status(500).json(response);
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
  let response = {};
  try {
    const id = req.params.id;
    const workshop = await Workshop.findById(id);
    if (!workshop) {
      response = {
        code: 404,
        type: "validation error",
        message: "Workshop not found",
      };
      res.status(404).json(response);
    }
    res.status(200).json(workshop);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error getting workshop by id: ", error);
    res.status(500).json(response);
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
    console.log("TESTING...............5at.................");
    // Validate input
    if (!req.body.name || !req.body.startDate || !req.body.endDate) {
      return res.status(400).json({
        code: 400,
        type: "client error",
        message: "Invalid input: name, startDate, and endDate are required",
      });
    }

    const workshop = new Workshop({
      _id: new mongoose.Types.ObjectId(),
      clientCompany: req.body.clientCompany,
      clientType: req.body.clientType,
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      duration: req.body.duration,
      status: req.body.status,
      type: req.body.type,
      maxParticipants: req.body.maxParticipants,
      client: req.body.client,
      trainerId: req.body.trainerId,
    });
    console.log("TESTING...............6at.................");
    const data = await workshop.save();
    console.log("TESTING...............7at.................");
    console.log("Workshop request created: ", data);
    res.status(200).json(data);
  } catch (error) {
    if (error.name === 'validation error') {
      return res.status(422).json({
        code: 422,
        type: "validation error",
        message: "Validation exception",
        details: error.message,
      });
    }

    const response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.log("Error creating workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json(response);
    }
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
  let response = {};
  try {
    const id = req.params.id;
    const { _id, ...updateData } = req.body;
    
    // Validate input data
    if (!id || Object.keys(updateData).length === 0) {
      response = {
        code: 400,
        type: "validation error",
        message: "Invalid input data",
      };
      return res.status(400).json(response);
    }

    const data = await Workshop.findByIdAndUpdate(id, updateData);
    if (!data) {
      response = {
        code: 404,
        type: "validation error",
        message: "Workshop not found",
      };
      res.status(404).json(response);
    }
    const response = {
      code: 200,
      message: "Workshop successfully updated",
      workshop: updateData,
    };
    res.status(200).json(response);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error updating workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json(response);
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
  let response = {};
  try {
    const id = req.params.id;
    const data = await Workshop.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({ message: "Workshop not found" });
    }
    response = {
      code: 200,
      message: "Workshop successfully deleted",
      workshop: data,
    };
    res.status(200).json(response);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error deleting workshop request: ", error);
    res.status(500).json(response);
  }
};

// Admin allocate Trainer to Workshop and once allocated, workshop status is updated from 'pending' to 'accepted'
// if no trainer is allocated, workshop status is updated from 'pending' to 'rejected'
exports.allocateTrToWorkshop = async (req, res) => {
  try {
    const { workshopId, trainerIds } = req.query;

    console.log(workshopId);
    console.log(trainerIds);

    if (!workshopId) {
      return res.status(400).json({ message: "Workshop ID is required" });
    }

    console.log("TESTING...............allocate..1.................");
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
    console.log("TESTING...............allocate..2.................");

    let allocatedTrainers = [];
    for (const trainerId of trainerIdsArray) {
      const trimmedTrainerId = trainerId.trim();
      console.log(`Processing trainer ID: ${trimmedTrainerId}`); // Log the current trainer ID being processed
      const trainer = await Trainer.findById(trimmedTrainerId);
      if (!trainer) {
        console.log(`Trainer with ID ${trainerId} not found`); // Log if trainer not found
        res
          .status(404)
          .json({ message: `Trainer with ID ${trainerId} not found` });
        continue;
      }
      if (!trainer.status) {
        console.log(`Trainer with ID ${trainerId} is not available`); // Log if trainer not available
        res
          .status(400)
          .json({ message: `Trainer with ID ${trainerId} is not available` });
        continue;
      }
      console.log(`Adding trainer ID ${trainerId} to allocatedTrainers`); // Log successful addition
      allocatedTrainers.push(trainer._id);
      await trainer.save();
    }
    if (allocatedTrainers.length === 0) {
      console.log("No trainers were allocated. Check the conditions above."); // Log if no trainers were added
    }
    // Allocate trainers to the workshop
    workshop.trainer = allocatedTrainers;
    console.log(allocatedTrainers);
    // Save the updated workshop
    await workshop.save();
    console.log(workshop);

    let updateStatus = {};
    if (workshop.trainer) {
      updateStatus = { status: "Accepted" };
    } else {
      updateStatus = { status: "Rejected" };
    }

    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      workshopId,
      updateStatus,
      { new: true }
    );

    if (!updatedWorkshop) {
      return res
        .status(400)
        .json({ message: "Workshop status was not updated" });
    }

    // Respond with the updated workshop information
    res.json({
      code: 200,
      message: `Trainers allocated successfully. Workshop status updated to ${updatedWorkshop.status}`,
      workshop: updatedWorkshop,
    });
  } catch (error) {
    console.error("Error allocating trainers to workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

//trainer permission
exports.updateWorkshopStatustoComplete = async (req, res) => {
  try {
    const workshopId = req.query.id;

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
    if (workshop.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Workshop is already marked as Completed" });
    }
    if (workshop.status === "Accepted") {
      // Assuming the status you want to change is from 'Accepted' to 'Completed'
      const data = await Workshop.findByIdAndUpdate(
        workshopId,
        { status: "Completed" },
        { new: true }
      );

      return res.json({
        code: 200,
        message: "Workshop marked as complete",
        workshop: data,
      });
    } else {
      return res
        .status(400)
        .json({
          message:
            "Workshop cannot be marked as complete from its current status",
        });
    }
  } catch (error) {
    console.error("Error updating workshop request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

//trainer permission
exports.getAllocatedWorkshops = async (req, res) => {
  try {
    const trainerId = req.query.id;

    if (!trainerId) {
      return res.status(400).json({ message: "Trainer ID is required" });
    }

    console.log("-----getting allocated workshops 1-------");
    //Query the DB for all workshops allocated to the trainer
    const workshops = await Workshop.find({ trainer: trainerId });
    console.log("Workshops found:", workshops);

    if (workshops.length === 0) {
      console.log("No workshops found for this trainer.");
    }

    res.json({
      code: 200,
      message: "Workshops found",
      workshop: workshops,
    });
  } catch (error) {
    console.error("Error retrieving allocated workshops: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

//admin permission                                                                   -works
exports.checkforSchedConflict = async (req, res) => {
  try {
    const { workshopId } = req.query;
    console.log(workshopId);
    if (!workshopId) {
      return res.status(400).json({ message: "Workshop ID are required" });
    }

    // Query the DB for the workshop with the given ID
    const requestedWorkshop = await Workshop.findById(workshopId);
    console.log(requestedWorkshop);
    if (!requestedWorkshop) {
      return res.status(404).json({ message: "Requested workshop not found" });
    }

    const dateFormat = "Do MMMM YYYY"; // Custom date format
    const requestedStartDate = moment(
      requestedWorkshop.startDate,
      dateFormat,
      true
    );
    const requestedEndDate = moment(
      requestedWorkshop.endDate,
      dateFormat,
      true
    );
    console.log(requestedStartDate, requestedEndDate);

    if (!requestedStartDate.isValid() || !requestedEndDate.isValid()) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Query the DB for all trainers
    const allTrainers = await Trainer.find();

    let availableTrainers = [];
    for (const trainer of allTrainers) {
      // Query the DB for all workshops allocated to the trainer
      const workshopsAllocToTR = await Workshop.find({
        trainer: trainer._id,
      }).populate("trainer");
      console.log(trainer.username, workshopsAllocToTR);

      let hasConflict = false;
      for (const workshop of workshopsAllocToTR) {
        const workshopStartDate = moment(workshop.startDate, dateFormat, true);
        const workshopEndDate = moment(workshop.endDate, dateFormat, true);

        // Check for conflicts
        if (
          requestedStartDate <= workshopEndDate &&
          requestedEndDate >= workshopStartDate
        ) {
          hasConflict = true;
          break;
        }
      }

      if (!hasConflict) {
        availableTrainers.push(trainer);
      }
    }

    if (availableTrainers.length > 0) {
      console.log("Available trainers:", availableTrainers);
      res.json({
        message: "Available trainers found",
        trainers: availableTrainers,
      });
    } else {
      res.status(409).json({ message: "No available trainers found" });
    }
  } catch (error) {
    console.error("Error checking for schedule conflicts: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

// dashboard method to calculate the number of workshops allocated for each trainer  -works
exports.getWorkshopsCountForTrainers = async (req, res) => {
  try {
    const { startMonth, endMonth } = req.query;

    if (!startMonth || !endMonth) {
      return res
        .status(400)
        .json({ message: "Start month and end month are required" });
    }

    // Parse the input months
    const parsedStartMonth = moment(startMonth, "MMMM YYYY", true).startOf(
      "month"
    );
    const parsedEndMonth = moment(endMonth, "MMMM YYYY", true).endOf("month");

    if (parsedStartMonth.isAfter(parsedEndMonth)) {
      return res.status(400).json({ code: 400, message: "Start month cannot be after end month" });
    }

    console.log("Parsed Start Month:", parsedStartMonth);
    console.log("Parsed End Month:", parsedEndMonth);

    // Query the DB for workshops within the specified month range
    const workshops = await Workshop.find();
    console.log("All Workshops:", workshops);
    // Filter workshops based on the parsed dates
    const filteredWorkshops = workshops.filter((workshop) => {
      const workshopStartDate = moment(
        workshop.startDate,
        "Do MMMM YYYY",
        true
      ).startOf("day");
      const workshopEndDate = moment(
        workshop.endDate,
        "Do MMMM YYYY",
        true
      ).endOf("day");

      // Log each workshop's start and end dates
      console.log(
        `Workshop: ${workshop.name}, Start Date: ${workshopStartDate}, End Date: ${workshopEndDate}`
      );
      console.log(
        `Parsed Start Month: ${parsedStartMonth}, Parsed End Month: ${parsedEndMonth}`
      );

      const isWithinRange =
        workshopStartDate.isSameOrAfter(parsedStartMonth) &&
        workshopEndDate.isSameOrBefore(parsedEndMonth);
      console.log(`Is within range: ${isWithinRange}`);
      return isWithinRange;
    });

    // Log the workshops retrieved from the database
    console.log("Filtered Workshops found:", filteredWorkshops);

    // Fetch all trainers
    const trainers = await Trainer.find();
    // Create a map to count workshops for each trainer
    const trainerWorkshopCount = {};
    trainers.forEach((trainer) => {
      trainerWorkshopCount[trainer._id] = 0;
    });

    filteredWorkshops.forEach((workshop) => {
      workshop.trainer.forEach((trainerId) => {
        if (!trainerWorkshopCount[trainerId]) {
          trainerWorkshopCount[trainerId] = 0;
        }
        trainerWorkshopCount[trainerId]++;
      });
    });

    res.json({
      code: 200,
      message: "Workshops count retrieved successfully",
      data: trainerWorkshopCount,
    });
  } catch (error) {
    console.error("Error retrieving workshops count: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

// dashboard method to calculate the trend of deal sizes                             -works
exports.getDealSizeTrend = async (req, res) => {
  try {
    const { startMonth, endMonth } = req.query;

    if (!startMonth || !endMonth) {
      return res
        .status(400)
        .json({ message: "Start month and end month are required" });
    }
    // Parse the input months
    const parsedStartMonth = moment(startMonth, "MMMM YYYY", true).startOf(
      "month"
    );
    const parsedEndMonth = moment(endMonth, "MMMM YYYY", true).endOf("month");

    console.log("Parsed Start Month:", parsedStartMonth);
    console.log("Parsed End Month:", parsedEndMonth);

    // Query the DB for workshops within the specified month range
    const workshops = await Workshop.find();
    console.log("All Workshops:", workshops);
    // Filter workshops based on the parsed dates
    const filteredWorkshops = workshops.filter((workshop) => {
      const workshopStartDate = moment(
        workshop.startDate,
        "Do MMMM YYYY",
        true
      ).startOf("day");
      const workshopEndDate = moment(
        workshop.endDate,
        "Do MMMM YYYY",
        true
      ).endOf("day");

      // Log each workshop's start and end dates
      console.log(
        `Workshop: ${workshop.name}, Start Date: ${workshopStartDate}, End Date: ${workshopEndDate}`
      );
      console.log(
        `Parsed Start Month: ${parsedStartMonth}, Parsed End Month: ${parsedEndMonth}`
      );

      const isWithinRange =
        workshopStartDate.isSameOrAfter(parsedStartMonth) &&
        workshopEndDate.isSameOrBefore(parsedEndMonth);
      console.log(`Is within range: ${isWithinRange}`);
      return isWithinRange;
    });

    // Log the workshops retrieved from the database
    console.log("Filtered Workshops found:", filteredWorkshops);

    if (filteredWorkshops.length === 0) {
      return res.json({ message: "No workshops found within the month range" });
    }

    let totalDealSize = 0;
    let validDealSizeCount = 0;
    //let dealSizes = [];

    for (const workshop of filteredWorkshops) {
      if (typeof workshop.dealSize === "number" && !isNaN(workshop.dealSize)) {
        console.log(
          `Workshop ${workshop.name} Deal Size: ${workshop.dealSize}`
        );
        totalDealSize += workshop.dealSize;
        validDealSizeCount++;
        //dealSizes.push(workshop.dealSize);
      }
    }

    console.log(`Total Deal Size: ${totalDealSize}`);
    console.log(`Valid Deal Size Count: ${validDealSizeCount}`);

    const averageDealSize =
      validDealSizeCount > 0 ? totalDealSize / validDealSizeCount : null;
    const totalRequests = workshops.length;
    const acceptedRequests = workshops.filter(
      (workshop) => workshop.status === "Accepted"
    ).length;
    const pendingRequests = workshops.filter(
      (workshop) => workshop.status === "Pending"
    ).length;
    const completedRequests = workshops.filter(
      (workshop) => workshop.status === "Completed"
    ).length;
    const rejectedRequests = workshops.filter(
      (workshop) => workshop.status === "Rejected"
    ).length;

    res.json({
      code: 200,
      message: "Deal size trend calculated",
      averageDealSize,
      totalRequests,
      acceptedRequests,
      pendingRequests,
      completedRequests,
      rejectedRequests,
    });
  } catch (error) {
    console.error("Error calculating deal size trend: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

/**
 * // Aggregate Workshops by Status
 *
 * @details
 * This function aggregates workshops by their status and counts the number of workshops for each status.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the aggregated workshop data.
 * If there is an error, returns a 500 status code with an error message.
 */
exports.aggregateWorkshopsByStatus = async (req, res) => {
  try {
    const statuses = ["Accepted", "Rejected", "Pending", "Completed"];

    const pipeline = [
      {
        $match: {
          status: { $in: statuses },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
      {
        $sort: { status: 1 }, // Sort by status if needed
      },
    ];

    // Perform the aggregation
    const aggregatedData = await Workshop.aggregate(pipeline);

    // Ensure all statuses are included, even if their count is zero
    const result = statuses.map((status) => {
      const entry = aggregatedData.find((item) => item.status === status);
      return {
        status,
        count: entry ? entry.count : 0,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error aggregating workshops: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
