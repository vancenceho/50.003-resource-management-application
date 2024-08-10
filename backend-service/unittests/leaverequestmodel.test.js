const mongoose = require("mongoose");
const moment = require("moment");
const { connectDB, cleanup } = require("../models/db.js");
const LeaveRequest = require("../models/leaveRequest");
const trainer = require("../models/trainer.js");

/**
 * // Leave Request Model Test
 *
 * @details
 * Test Case 1: This function creates a new leave request and saves it to the database.
 * Test Case 2: It then retrieves the leave request from the database.
 * Test Case 3: It then updates the leave request status.
 * Test Case 4: It then deletes the leave request.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If expected data matches the leave request data, the test passes.
 * Else, the test fails.
 *
 */
describe("Leave Request Model Test", () => {
  let savedLeaveRequestId;

  beforeAll(async () => {
    await connectDB();
  });

  // Test Case 1: Create and save leave request successfully
  it("create and save leave request successfully", async () => {
    const leaveRequestData = {
      _id: new mongoose.Types.ObjectId(),
      trainer: new mongoose.Types.ObjectId(),
      startDate: moment().format("LL"),
      endDate: moment().format("LL"),
      duration: 5,
      status: "pending",
      type: "leave",
      reason: "sick",
    };

    const validLeaveRequest = new LeaveRequest(leaveRequestData);
    const savedLeaveRequest = await validLeaveRequest.save();

    savedLeaveRequestId = savedLeaveRequest._id;

    // Assertions
    expect(savedLeaveRequest._id).toBeDefined();
    expect(savedLeaveRequest.trainer).toBe(leaveRequestData.trainer);
    expect(savedLeaveRequest.startDate).toBe(leaveRequestData.startDate);
    expect(savedLeaveRequest.endDate).toBe(leaveRequestData.endDate);
    expect(savedLeaveRequest.duration).toBe(leaveRequestData.duration);
    expect(savedLeaveRequest.status).toBe(leaveRequestData.status);
    expect(savedLeaveRequest.type).toBe(leaveRequestData.type);
    expect(savedLeaveRequest.reason).toBe(leaveRequestData.reason);
  });

  // Test Case 2: Retrieving a leave request
  it("find leave request by _id", async () => {
    const foundLeaveRequest = await LeaveRequest.findOne({
      _id: savedLeaveRequestId,
    });
    expect(foundLeaveRequest).toBeDefined();
    expect(foundLeaveRequest._id.toString()).toBe(
      savedLeaveRequestId.toString()
    );
  });

  // Test Case 3: Updating a leave request
  it("update leave request status", async () => {
    await LeaveRequest.findOneAndUpdate(
      { _id: savedLeaveRequestId },
      { status: "approved" }
    );
    const updatedLeaveRequest = await LeaveRequest.findOne({
      _id: savedLeaveRequestId,
    });
    expect(updatedLeaveRequest.status).toBe("approved");
  });

  // Test Case 4: Deleting a leave request
  it("delete leave request by employeeId", async () => {
    await LeaveRequest.findOneAndDelete({ _id: savedLeaveRequestId });
    const deletedLeaveRequest = await LeaveRequest.findOne({
      _id: savedLeaveRequestId,
    });
    expect(deletedLeaveRequest).toBeNull();
  });

  afterAll(async () => {
    await cleanup();
  });
});