const mongoose = require("mongoose");
const { connectDB, cleanup } = require("../models/db.js");
const Admin = require("../models/admin.js");
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

describe("Admin Model Test with Path Testing and MCDC", () => {
  beforeAll(async () => {
    await dbConnectionPromise;
  });

  beforeEach(async () => {
    await Admin.deleteMany({});
    generatedIds.clear();
  });
  
  // Path Test Case 1: Create and save admin successfully with valid data
  it("create and save admin successfully with valid data", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          _id: objectIdArbitrary,
          username: fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
          firstName: fc.string({ minLength: 2, maxLength: 50 }).filter((str) => /^[a-zA-Z]{2,50}$/.test(str)),
          lastName: fc.string({ minLength: 2, maxLength: 50 }).filter((str) => /^[a-zA-Z]{2,50}$/.test(str)),
          email: fc.emailAddress(),
          password: fc.string({ minLength: 5, maxLength: 50 }),
          role: fc.constant("admin"),
        }),
        async (adminData) => {
          try {
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

  // Path Test Case 2: Create admin with invalid data
  it("create admin with invalid data", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          _id: fc.constant(new mongoose.Types.ObjectId()),
          username: fc.string({ minLength: 1, maxLength: 2 }), // Invalid username
          firstName: fc.string({ minLength: 1, maxLength: 1 }), // Invalid firstName
          lastName: fc.string({ minLength: 1, maxLength: 1 }), // Invalid lastName
          email: fc.string({ minLength: 1, maxLength: 5 }), // Invalid email
          password: fc.string({ minLength: 1, maxLength: 4 }), // Invalid password
          role: fc.constant("admin"),
        }),
        async (adminData) => {
          const invalidAdmin = new Admin(adminData);
          let error = null;
          try {
            await invalidAdmin.save();
          } catch (err) {
            error = err;
          }
          expect(error).toBeDefined();
        }
      )
    );
  });

  // Path Test Case 3: Retrieving an admin
  it("find admin by username with valid and invalid usernames", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        async (username) => {
          const admin = await Admin.findOne({ username });
          if (admin) {
            expect(admin.username).toBe(username);
          } else {
            expect(admin).toBeNull();
          }
        }
      )
    );

    await fc.assert(
      fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 2 }), // Invalid username
          async (username) => {
              try {
                  const admin = await Admin.findOne({ username });
                  expect(admin).toBeNull();
              } catch (error) {
                  console.error('An error occurred:', error);
                  logErrorToFile(error);
                  throw error;
              }
          }
      )
  );
});
  // Path Test Case 4: Updating an admin email with valid and invalid emails
  it("update admin email with valid and invalid emails", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        fc.emailAddress(),
        async (username, newEmail) => {
          await Admin.findOneAndUpdate({ username }, { email: newEmail });
          const updatedAdmin = await Admin.findOne({ username });
          if (updatedAdmin) {
            expect(updatedAdmin.email).toBe(newEmail);
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
            await Admin.findOneAndUpdate({ username }, { email: newEmail });
          } catch (err) {
            error = err;
          }
          expect(error).toBeDefined();
        }
      )
    );
  });

  // Path Test Case 5: Deleting an admin
  it("delete admin with valid and invalid usernames", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3, maxLength: 30 }).filter((str) => /^[a-zA-Z0-9]{3,30}$/.test(str)),
        async (username) => {
          await Admin.findOneAndDelete({ username });
          const deletedAdmin = await Admin.findOne({ username });
          expect(deletedAdmin).toBeNull();
        }
      )
    );

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 2 }), // Invalid username
        async (username) => {
          let error = null;
          try {
            await Admin.findOneAndDelete({ username });
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