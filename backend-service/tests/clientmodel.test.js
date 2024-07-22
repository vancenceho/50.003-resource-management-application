<<<<<<< HEAD
const mongoose = require('mongoose');
const { connectDB, cleanup } = require('../models/db.js');
const Client = require('../models/client'); 

describe('Client Model Test', () => {
  // Connect to the database before running any tests
=======
const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const Client = require("../models/client");

/**
 * // Client Model Test
 *
 * @details
 * Step 1: This function creates a new client.
 * Step 2: It then saves the client to the database.
 * Step 3: It then retrieves the client from the database.
 * Step 4: It then compares the client data to the expected client data.
 * Step 5: If the client data matches the expected client data, the test passes.
 * Step 6: If the client data does not match the expected client data, the test fails.
 *
 * @param {*} req
 * @param {*} res
 *
 * @returns
 * If the client data matches the expected client data, the test passes.
 * If the client data does not match the expected client data, the test fails.
 *
 */
describe("Client Model Test", () => {
>>>>>>> bd601441689d38464c7a793f65f54511b5e45877
  beforeAll(async () => {
    await connectDB();
  });

<<<<<<< HEAD

  // Test case for creating a new client
  it('create & save client successfully', async () => {
    const clientData = {
      _id: new mongoose.Types.ObjectId(),
      username: 'testClient',
      firstName: 'Test',
      lastName: 'Client',
      email: 'testclient@example.com',
      password: '12345',
      role: 'client'
=======
  it("create and save client successfully", async () => {
    const clientData = {
      _id: new mongoose.Types.ObjectId(),
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "12345",
      role: "client",
>>>>>>> bd601441689d38464c7a793f65f54511b5e45877
    };
    const validClient = new Client(clientData);
    const savedClient = await validClient.save();

    // Assertions
    expect(savedClient._id).toBeDefined();
    expect(savedClient.username).toBe(clientData.username);
<<<<<<< HEAD
    expect(savedClient.email).toBe(clientData.email);
  });

  // Test case for retrieving a client
  it('find client by username', async () => {
    const client = await Client.findOne({ username: 'testClient' });
    expect(client.username).toBe('testClient');
  });

  // Test case for updating a client
  it('update client email', async () => {
    await Client.findOneAndUpdate({ username: 'testClient' }, { email: 'newemail@example.com' });
    const updatedClient = await Client.findOne({ username: 'testClient' });
    expect(updatedClient.email).toBe('newemail@example.com');
  });

  // Test case for deleting a client
  it('delete client', async () => {
    await Client.findOneAndDelete({ username: 'testClient' });
    const deletedClient = await Client.findOne({ username: 'testClient' });
    expect(deletedClient).toBeNull();
  });


  // Clean up the database and close the connection after all tests have run
  afterAll(async () => {
    await Client.deleteMany();
    await cleanup();
  });


});
=======
    expect(savedClient.firstName).toBe(clientData.firstName);
    expect(savedClient.lastName).toBe(clientData.lastName);
    expect(savedClient.email).toBe(clientData.email);
    expect(savedClient.password).toBe(clientData.password);
    expect(savedClient.role).toBe(clientData.role);
  });

  it("find client by username", async () => {
    const client = await Client.findOne({ username: "testuser" });
    expect(client.username).toBe("testuser");
  });

  it("update client email", async () => {
    await Client.findOneAndUpdate(
      { username: "testuser" },
      { email: "newemail@example.com" }
    );
    const updatedClient = await Client.findOne({ username: "testuser" });
    expect(updatedClient.email).toBe("newemail@example.com");
  });

  it("delete client", async () => {
    await Client.findOneAndDelete({ username: "testuser" });
    const deletedClient = await Client.findOne({ username: "testuser" });
    expect(deletedClient).toBeNull();
  });

  afterAll(async () => {
    await cleanup();
  });
});
>>>>>>> bd601441689d38464c7a793f65f54511b5e45877
