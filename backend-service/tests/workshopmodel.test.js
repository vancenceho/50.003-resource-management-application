const mongoose = require('mongoose');
const { connectDB, cleanup } = require('../models/db.js');
const workshopRequest = require('../models/workshopRequest'); 
const client = require('../models/client.js');

describe('workshopRequest Model Test', () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await connectDB();
  });


  // Test case for creating a new workshop Request
  it('create & save workshopRequest successfully', async () => {


    const workshopRequestData = {
      _id: new mongoose.Types.ObjectId(),
        name: 'testWorkshop',
        description: 'Test Description',
        startDate: '12th December 2021',
        endDate: '12th January 2022',
        location: 'Test Location',
        timeStart: '10:00',
        timeEnd: '12:00',
        duration: 2,
        status: 'pending',
        type: 'workshop',
        maxParticipants: 20,
        "client": {
            "_id": "668d5ba4a5f8eca9ff47283e",
            "username": "theClient",
            "firstName": "Lewis",
            "lastName": "Hamilton",
            "email": "lewis@example.com",
            "password": "12345",
            "role": "client"
        },
        "trainer": {
            "_id": "668d5ba4a5f8eca9ff47283e",
            "username": "theTrainer",
            "firstName": "Sebastian",
            "lastName": "Vettel",
            "email": "sebastian@example.com",
            "password": "12345",
            "role": "trainer",
            "status": "available"
        }
    };
    const validWR = new workshopRequest(workshopRequestData);
    const savedWR = await validWR.save();

    // Assertions
    expect(savedWR._id).toBeDefined();
    expect(savedWR.name).toBe(workshopRequestData.name);
  });

    // Test for required fields
    /*it('create workshop without required fields should fail', async () => {
        const workshopData = {};
        let err;
        try {
          const invalidWorkshop = new Workshop(workshopData);
          await invalidWorkshop.save();
        } catch (error) {
          err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
        expect(err.errors.location).toBeDefined();
        expect(err.errors.maxParticipants).toBeDefined();
        expect(err.errors.client).toBeDefined();
        expect(err.errors.trainer).toBeDefined();
      });*/


  // Test case for retrieving a WR
  it('find WR by username', async () => {
    const WR = await workshopRequest.findOne({ name: 'testWorkshop' });
    expect(WR.name).toBe('testWorkshop');
  });

  // Test case for updating a WR
  it('update client duration', async () => {
    await workshopRequest.findOneAndUpdate({  name: 'testWorkshop'  }, { duration: 6 });
    const updatedWR = await workshopRequest.findOne({  name: 'testWorkshop' });
    expect(updatedWR.duration).toBe(6);
  });

 /*
  // Test case for deleting a WR
  it('delete WR', async () => {
    await workshopRequest.findOneAndDelete({  name: 'testWorkshop' });
    const deletedWR = await workshopRequest.findOne({ name: 'testWorkshop' });
    expect(deletedWR).toBeNull();
  });
*/

  // Clean up the database and close the connection after all tests have run
  afterAll(async () => {
    await cleanup();
  });


});