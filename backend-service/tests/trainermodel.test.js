const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const Trainer = require("../models/trainer");

/**
 * // Trainer Model Test
 *
 * @details
 * Test Case 1: This function creates a new trainer and save it to the database.
 * Test Case 2: It then retrieves the trainer from the database.
 * Test Case 3: It then updates the trainer email.
 * Test Case 4: It then deletes the trainer.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If expected data matches the trainer data, the test passes.
 * Else, the test fails.
 *
 */
describe("Trainer Model Test", () => {
  beforeAll(async () => {
    await connectDB();
  });

  // Test Case 1: Create and save trainer successfully
  it("create and save trainer successfully", async () => {
    const trainerData = {
      _id: new mongoose.Types.ObjectId(),
      username: "testtrainer",
      firstName: "Test",
      lastName: "Trainer",
      email: "testtrainer@example.com",
      password: "12345",
      role: "trainer",
      status: "available",
    };

    const validTrainer = new Trainer(trainerData);
    const savedTrainer = await validTrainer.save();

    // Assertions
    expect(savedTrainer._id).toBeDefined();
    expect(savedTrainer.username).toBe(trainerData.username);
    expect(savedTrainer.firstName).toBe(trainerData.firstName);
    expect(savedTrainer.lastName).toBe(trainerData.lastName);
    expect(savedTrainer.email).toBe(trainerData.email);
    expect(savedTrainer.password).toBe(trainerData.password);
    expect(savedTrainer.role).toBe(trainerData.role);
    expect(savedTrainer.status).toBe(trainerData.status);
  });

  // Test Case 2: Retrieving a trainer
  it("find trainer by username", async () => {
    const trainer = await Trainer.findOne({ username: "testtrainer" });
    expect(trainer.username).toBe("testtrainer");
  });

  // Test Case 3: Updating a trainer
  it("update trainer email", async () => {
    await Trainer.findOneAndUpdate(
      { username: "testtrainer" },
      { email: "newemail@example.com" }
    );
    const updatedTrainer = await Trainer.findOne({ username: "testtrainer" });
    expect(updatedTrainer.email).toBe("newemail@example.com");
  });

  // Test Case 4: Deleting a trainer
  it("delete trainer", async () => {
    await Trainer.findOneAndDelete({ username: "testtrainer" });
    const deletedTrainer = await Trainer.findOne({ username: "testtrainer" });
    expect(deletedTrainer).toBeNull();
  });

  afterAll(async () => {
    await cleanup();
  });
});
