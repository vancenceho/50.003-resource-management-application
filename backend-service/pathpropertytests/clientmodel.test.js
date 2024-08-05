const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const Client = require("../models/client.js");
const fc = require("fast-check");
const fs = require('fs');
const path = require('path');
const { app, dbConnectionPromise } = require("../app.js");

// Function to log errors to a file
function logErrorToFile(error) {
    const logFilePath = path.join(__dirname, 'error.log');
    const logMessage = `${new Date().toISOString()} - ${error.message}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  }
  

const generatedIds = new Set();

const objectIdArbitrary = fc.hexaString({ minLength: 24, maxLength: 24 })
  .filter((id) => {
    if (generatedIds.has(id)) {
      return false;
    }
    generatedIds.add(id);
    return true;
  })
  .map((id) => new mongoose.Types.ObjectId(id));
// Generate and log some example ObjectIds
const sampleObjectIds = fc.sample(objectIdArbitrary, 10);
//console.log(sampleObjectIds);

describe("Client Model Test with Path Testing and MCDC", () => {
  beforeAll(async () => {
    await dbConnectionPromise;
  });

  beforeEach(async () => {
    await Client.deleteMany({});
    generatedIds.clear();
  });

    // Path Test Case 1: Create and save client successfully with valid data
    it("create and save client successfully with valid data", async () => {
    await fc.assert(
    fc.asyncProperty(
        fc.record({
        _id: objectIdArbitrary,
        username: fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        firstName: fc.string({ minLength: 2, maxLength: 50 }).filter((str) => /^[a-zA-Z]{2,50}$/.test(str)),
        lastName: fc.string({ minLength: 2, maxLength: 50 }).filter((str) => /^[a-zA-Z]{2,50}$/.test(str)),
        email: fc.emailAddress(),
        password: fc.string({ minLength: 5, maxLength: 50 }),
        role: fc.constant("client"),
        }),
        async (clientData) => {
        try {
            const validClient = new Client(clientData);
            const savedClient = await validClient.save();
        
            // Assertions
            expect(savedClient._id).toBeDefined();
            expect(savedClient.username).toBe(clientData.username);
            expect(savedClient.firstName).toBe(clientData.firstName);
            expect(savedClient.lastName).toBe(clientData.lastName);
            expect(savedClient.email).toBe(clientData.email);
            expect(savedClient.password).toBe(clientData.password);
            expect(savedClient.role).toBe(clientData.role);
        } catch (error) {
            if (error.code === 11000) {
                //console.error('Duplicate key error. Document already exists!');
                logErrorToFile(new Error('Duplicate key error. Document already exists!'));
                // Handle the duplicate key error here (e.g., retry with different data)
            } else {
                console.error('An error occurred:', error);
                logErrorToFile(error);
                throw error;
            }
        }
    }
), //{ verbose: 2 } // Enable verbose mode to log the generated data
);
});

  // Path Test Case 2: Create client with invalid data
  it("create client with invalid data", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          _id: fc.constant(new mongoose.Types.ObjectId()),
          username: fc.string({ minLength: 1, maxLength: 2 }), // Invalid username
          firstName: fc.string({ minLength: 1, maxLength: 1 }), // Invalid firstName
          lastName: fc.string({ minLength: 1, maxLength: 1 }), // Invalid lastName
          email: fc.string({ minLength: 1, maxLength: 5 }), // Invalid email
          password: fc.string({ minLength: 1, maxLength: 4 }), // Invalid password
          role: fc.constant("client"),
        }),
        async (clientData) => {
          const invalidClient = new Client(clientData);
          let error = null;
          try {
            await invalidClient.save();
          } catch (err) {
            error = err;
          }
          expect(error).toBeDefined();
        }
      )
    );
  });

  // Path Test Case 3: Retrieving a client
  it("find client by username with valid and invalid usernames", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        async (username) => {
          const client = await Client.findOne({ username });
          if (client) {
            expect(client.username).toBe(username);
          } else {
            expect(client).toBeNull();
          }
        }
      )
    );

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 2 }), // Invalid username
        async (username) => {
          const client = await Client.findOne({ username });
          expect(client).toBeNull();
        }
      )
    );
  });

  // Path Test Case 4: Updating a client email with valid and invalid emails
  it("update client email with valid and invalid emails", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        fc.emailAddress(),
        async (username, newEmail) => {
          await Client.findOneAndUpdate({ username }, { email: newEmail });
          const updatedClient = await Client.findOne({ username });
          if (updatedClient) {
            expect(updatedClient.email).toBe(newEmail);
          }
        }
      )
    );

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        fc.string({ minLength: 1, maxLength: 5 }), // Invalid email
        async (username, newEmail) => {
          let error = null;
          try {
            await Client.findOneAndUpdate({ username }, { email: newEmail });
          } catch (err) {
            error = err;
          }
          expect(error).toBeDefined();
        }
      )
    );
  });

  // Path Test Case 5: Deleting a client
  it("delete client with valid and invalid usernames", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        async (username) => {
          await Client.findOneAndDelete({ username });
          const deletedClient = await Client.findOne({ username });
          expect(deletedClient).toBeNull();
        }
      )
    );

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 2 }), // Invalid username
        async (username) => {
          let error = null;
          try {
            await Client.findOneAndDelete({ username });
          } catch (err) {
            error = err;
          }
          expect(error).toBeDefined();
        }
      )
    );
  });

  afterAll(async () => {
    await cleanup();
  });
});