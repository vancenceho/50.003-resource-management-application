const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const Admin = require("../models/admin.js");

/**
 * // Admin Model Test
 *
 * @details
 * Test Case 1: This function creates a new admin and save it to the database.
 * Test Case 2: It then retrieves the admin from the database.
 * Test Case 3: It then updates the admin email.
 * Test Case 4: It then deletes the admin.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If expected data matches the admin data, the test passes.
 * Else, the test fails.
 *
 */
describe("Admin Model Test", () => {
  beforeAll(async () => {
    await connectDB();
  });

  // Test Case 1: Create and save admin successfully
  it("create and save admin successfully", async () => {
    const adminData = {
      _id: new mongoose.Types.ObjectId(),
      username: "testadmin",
      firstName: "Test",
      lastName: "Admin",
      email: "testadmin@exampl.com",
      password: "12345",
      role: "admin",
    };

    const validAdmin = new Admin(adminData);
    const savedAdmin = await validAdmin.save();

    // Assertions
    expect(savedAdmin._id).toBeDefined();
    expect(savedAdmin.username).toBe(adminData.username);
    expect(savedAdmin.firstName).toBe(adminData.firstName);
    expect(savedAdmin.lastName).toBe(adminData.lastName);
    expect(savedAdmin.email).toBe(adminData.email);
    expect(savedAdmin.password).toBe(adminData.password);
    expect(savedAdmin.role).toBe(adminData.role);
  });

  // Test Case 2: Retrieving an admin
  it("find admin by username", async () => {
    const admin = await Admin.findOne({ username: "testadmin" });
    expect(admin.username).toBe("testadmin");
  });

  // Test Case 3: Updating an admin
  it("update admin email", async () => {
    await Admin.findOneAndUpdate(
      { username: "testadmin" },
      { email: "newemail@example.com" }
    );
    const updatedAdmin = await Admin.findOne({ username: "testadmin" });
    expect(updatedAdmin.email).toBe("newemail@example.com");
  });

  // Test Case 4: Deleting an admin
  it("delete admin", async () => {
    await Admin.findOneAndDelete({ username: "testadmin" });
    const deletedAdmin = await Admin.findOne({ username: "testadmin" });
    expect(deletedAdmin).toBeNull();
  });

  afterAll(async () => {
    await cleanup();
  });
});
