const mongoose = require("mongoose");
const { connectDB } = require("../models/db.js");

describe('Database Connection Test', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('should connect to the database successfully', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });
});