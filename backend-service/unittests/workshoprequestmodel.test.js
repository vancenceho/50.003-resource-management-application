const mongoose = require("mongoose");
const moment = require("moment");
const { connectDB, cleanup } = require("../models/db.js");
const WorkshopRequest = require("../models/workshopRequest");
const { describe, before } = require("node:test");
const { start } = require("repl");
const client = require("../models/client.js");

/**
 * // Workshop Request Model Test
 *
 * @details
 * Test Case 1: This function creates a new workshop request and saves it to the database.
 * Test Case 2: It then retrieves the workshop request from the database.
 * Test Case 3: It then updates the workshop request status.
 * Test Case 4: It then deletes the workshop request.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If expected data matches the workshop request data, the test passes.
 * Else, the test fails.
 *
 */
describe("Workshop Request Model Test", () => {
  let savedWorkshopRequestId;

  beforeAll(async () => {
    await connectDB();
  });

  // Test Case 1: Create and save workshop request successfully
  it("create and save workshop request successfully", async () => {
    const startMoment = moment();
    const endMoment = moment().add(1, "days");
    const duration = endMoment.diff(startMoment, "days");

    const startDate = startMoment.format("LL");
    const endDate = endMoment.format("LL");

    const workshopRequestData = {
      _id: new mongoose.Types.ObjectId(),
      name: "testWorkshop",
      description: "testDescription",
      startDate: startDate,
      endDate: endDate,
      location: "testLocation",
      timeStart: moment().format("LT"),
      timeEnd: moment().format("LT"),
      duration: duration,
      status: "pending",
      type: "workshop",
      maxParticipants: 10,
      client: new mongoose.Types.ObjectId(),
      trainer: new mongoose.Types.ObjectId(),
    };

    const validWorkshopRequest = new WorkshopRequest(workshopRequestData);
    const savedWorkshopRequest = await validWorkshopRequest.save();

    savedWorkshopRequestId = savedWorkshopRequest._id;

    // Assertions
    expect(savedWorkshopRequest._id).toBeDefined();
    expect(savedWorkshopRequest.name).toBe(workshopRequestData.name);
    expect(savedWorkshopRequest.description).toBe(
      workshopRequestData.description
    );
    expect(savedWorkshopRequest.startDate).toBe(workshopRequestData.startDate);
    expect(savedWorkshopRequest.endDate).toBe(workshopRequestData.endDate);
    expect(savedWorkshopRequest.location).toBe(workshopRequestData.location);
    expect(savedWorkshopRequest.timeStart).toBe(workshopRequestData.timeStart);
    expect(savedWorkshopRequest.timeEnd).toBe(workshopRequestData.timeEnd);
    expect(savedWorkshopRequest.duration).toBe(workshopRequestData.duration);
    expect(savedWorkshopRequest.status).toBe(workshopRequestData.status);
    expect(savedWorkshopRequest.type).toBe(workshopRequestData.type);
    expect(savedWorkshopRequest.maxParticipants).toBe(
      workshopRequestData.maxParticipants
    );
    expect(savedWorkshopRequest.client).toBe(workshopRequestData.client);
    expect(savedWorkshopRequest.trainer).toContain(workshopRequestData.trainer);
  });

  // Test Case 2: Retrieving a workshop request
  it("find workshop request by _id", async () => {
    const foundWorkshopRequest = await WorkshopRequest.findOne({
      _id: savedWorkshopRequestId,
    });
    expect(foundWorkshopRequest).toBeDefined();
    expect(foundWorkshopRequest._id.toString()).toBe(
      savedWorkshopRequestId.toString()
    );
  });

  // Test Case 3: Updating a workshop request
  it("update workshop request status", async () => {
    await WorkshopRequest.findOneAndUpdate(
      { _id: savedWorkshopRequestId },
      { status: "approved" }
    );
    const updatedWorkshopRequest = await WorkshopRequest.findOne({
      _id: savedWorkshopRequestId,
    });
    expect(updatedWorkshopRequest.status).toBe("approved");
  });

  // Test Case 4: Deleting a workshop request
  it("delete workshop request by _id", async () => {
    await WorkshopRequest.findOneAndDelete({ _id: savedWorkshopRequestId });
    const deletedWorkshopRequest = await WorkshopRequest.findOne({
      _id: savedWorkshopRequestId,
    });
    expect(deletedWorkshopRequest).toBeNull();
  });

  afterAll(async () => {
    await cleanup();
  });
});