const LeaveRequest = require("../models/leaveRequest");
const mongoose = require("mongoose");
const moment = require("moment");

/**
 * // Get Leave Requests
 *
 * @details
 * Step 1: This function retrieves all the leave requests from the database.
 * Step 2: It then returns a 200 status code with the leave requests data.
 * Step 3: If there is an error retrieving the leave requests, it returns a 500 status code with an error message.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If successful, returns a 200 status code with the leave requests data.
 * If there is an error retrieving the leave requests, returns a 500 status code with an error message.
 */
exports.getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error("Error getting leave requests: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Get Leave Request by Trainer ID
 *
 * @details
 * Step 1: This function first retrieves the trainer id from the request query.
 * Step 2: It then attempts to find the leave request with the given trainer id in the database.
 * Step 3: If the leave request is not found, it returns a 404 status code with an error message.
 * Step 4: If the leave request is found, it returns a 200 status code with the leave request data.
 *
 * @param {mongoose.Types.ObjectId} trainerId
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the leave request is found, returns a 200 status code with the leave request data.
 * If the leave request is not found, returns a 404 status code with an error message.
 * If there is an error retrieving the leave request, returns a 500 status code with an error message.
 *
 */
exports.getLeaveRequestByTrainerId = async (req, res) => {
  try {
    const trainerId = req.query.trainerId;
    const leaveRequest = await LeaveRequest.findOne({ trainerId: trainerId });
    if (!leaveRequest) {
      res.status(404).json({ message: "Leave request not found" });
    }
    res.status(200).json(leaveRequest);
  } catch (error) {
    console.error("Error getting leave request by trainer id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Create Leave Request
 *
 * @details
 * Step 1: This function first retrieves the trainer id, start date and end date from the request body.
 * Step 2: It then attempts to find the trainer with the given id in the database.
 * Step 3: If the trainer is not found, it returns a 404 status code with an error message.
 * Step 4: If the trainer is found, it creates a new leave request with the given details.
 * Step 5: It then saves the leave request to the database.
 * Step 6: If there is an error saving the leave request, it returns a 500 status code with an error message.
 * Step 7: If the leave request is saved successfully, it returns a 201 status code with the leave request data.
 *
 * @param {mongoose.Types.ObjectId} trainerId
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the trainer is not found, returns a 404 status code with an error message.
 * If there is an error saving the leave request, returns a 500 status code with an error message.
 * If the leave request is saved successfully, returns a 201 status code with the leave request data.
 */
exports.createLeaveRequest = async (req, res) => {
  try {
    const trainerId = new mongoose.Types.ObjectId(req.query.trainerId);
    const startDate = moment(req.body.startDate, "DD-MM-YYYY").format("LL");
    const endDate = moment(req.body.endDate, "DD-MM-YYYY").format("LL");
    const leaveRequest = new LeaveRequest({
      _id: new mongoose.Types.ObjectId(),
      trainerId: trainerId,
      startDate: startDate,
      endDate: endDate,
      duration: moment(endDate).diff(moment(startDate), "days"),
    });
    await leaveRequest.save();
    res.status(200).json(leaveRequest);
  } catch (error) {
    console.error("Error creating leave request: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * // Update Leave Request
 *
 * @details
 * Step 1: This function first retrieves the leave request id from the request query.
 * Step 2: It then attempts to find the leave request with the given id in the database.
 * Step 3: If the leave request is not found, it returns a 404 status code with an error message.
 * Step 4: If the leave request is found, it updates the leave request with the new details.
 * Step 5: It then saves the updated leave request to the database.
 * Step 6: If there is an error saving the updated leave request, it returns a 500 status code with an error message.
 * Step 7: If the leave request is updated successfully, it returns a 200 status code with the updated leave request data.
 *
 * @param {mongoose.Types.ObjectId} _id
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the leave request is not found, returns a 404 status code with an error message.
 * If there is an error saving the updated leave request, returns a 500 status code with an error message.
 * If the leave request is updated successfully, returns a 200 status code with the updated leave request data.
 */
exports.updateLeaveRequest = async (req, res) => {
  try {
    const id = req.query._id;
    const data = await LeaveRequest.findByIdAndUpdate(id, req.body);
    if (!data) {
      res.status(404).json({ message: "Leave request not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error updating leave request: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

/**
 * // Delete Leave Request
 *
 * @details
 * Step 1: This function first retrieves the leave request id from the request query.
 * Step 2: It then attempts to find the leave request with the given id in the database.
 * Step 3: If the leave request is not found, it returns a 404 status code with an error message.
 * Step 4: If the leave request is found, it deletes the leave request from the database.
 * Step 5: If there is an error deleting the leave request, it returns a 500 status code with an error message.
 * Step 6: If the leave request is deleted successfully, it returns a 200 status code with the deleted leave request data.
 *
 * @param {mongoose.Types.ObjectId} _id
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the leave request is not found, returns a 404 status code with an error message.
 * If there is an error deleting the leave request, returns a 500 status code with an error message.
 * If the leave request is deleted successfully, returns a 200 status code with the deleted leave request data.
 */
exports.deleteLeaveRequest = async (req, res) => {
  try {
    const id = req.query._id;
    const data = await LeaveRequest.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({ message: "Leave request not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error deleting leave request: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
