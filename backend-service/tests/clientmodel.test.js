const mongoose = require('mongoose');
const { connectDB, cleanup } = require('../models/db.js');
const Client = require('../models/client'); 

describe('Client Model Test', () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await connectDB();
  });


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
    };
    const validClient = new Client(clientData);
    const savedClient = await validClient.save();

    // Assertions
    expect(savedClient._id).toBeDefined();
    expect(savedClient.username).toBe(clientData.username);
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
    await cleanup();
  });


});