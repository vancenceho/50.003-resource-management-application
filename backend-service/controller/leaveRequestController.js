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
    const response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error getting leave requests: ", error);
    res.status(500).json(response);
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
  let response = {};
  try {
    const trainerId = req.query.trainerId;
    const leaveRequest = await LeaveRequest.find({ trainerId: trainerId });
    if (!leaveRequest) {
      response = {
        code: 404,
        type: "validation error",
        message: "Leave request not found",
      };
      return res.status(404).json(response);
    }
    res.status(200).json(leaveRequest);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error getting leave request by trainer id: ", error);
    return res.status(500).json(response);
  }
};

/**
 * // Create Leave Request
 *
 * @details
 * Step 1: The function creates a new leave request with the details provided in the request body.
 * Step 2: It then saves the leave request to the database.
 * Step 3: If there is an error creating the leave request, it returns a 500 status code with an error message.
 * Step 4: If the leave request is created successfully, it returns a 200 status code with the leave request data.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If there is an error creating the leave request, returns a 500 status code with an error message.
 * If the leave request is created successfully, returns a 200 status code with the leave request data.
 */
exports.createLeaveRequest = async (req, res) => {
  try {
    //const startDate = moment(req.body.startDate, "DD-MM-YYYY").format("LL");
    //const endDate = moment(req.body.endDate, "DD-MM-YYYY").format("LL");
    const leaveRequest = new LeaveRequest({
      _id: new mongoose.Types.ObjectId(),
      trainer: req.body.trainer,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      duration: req.body.duration,
      status: req.body.status,
      type: req.body.type,
      reason: req.body.reason,
    });
    await leaveRequest.save();
    res.status(200).json(leaveRequest);
  } catch (error) {
    const response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error creating leave request: ", error);
    res.status(500).json(response);
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
  let response = {};
  try {
    const id = req.params.id;
    const { _id, ...updateData } = req.body;
    const data = await LeaveRequest.findByIdAndUpdate(id, updateData, { new: true });
    if (!data) {
      response = {
        code: 404,
        type: "validation error",
        message: "Leave request not found",
      };
      return res.status(404).json(response);
    }
    response = {
      code: 200,
      message: "Leave request successfully updated",
      leaveRequest: updateData,
    };
    return res.status(200).json(response);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error updating leave request: ", error);
    if (!res.headersSent) {
      return res.status(500).json(response);
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
  let response = {};
  try {
    const id = req.params.id;
    const data = await LeaveRequest.findByIdAndDelete(req.params.id, req.body);
    if (!data) {
      response = {
        code: 404,
        type: "validation error",
        message: "Leave request not found",
      };
      res.status(404).json(response);
    }
    response = {
      code: 200,
      message: "Leave request successfully deleted",
      leaveRequest: data,
    };
    res.status(200).json(response);
  } catch (error) {
    response = {
      code: 500,
      type: "server error",
      message: "Internal Server Error",
    };
    console.error("Error deleting leave request: ", error);
    res.status(500).json(response);
  }
};