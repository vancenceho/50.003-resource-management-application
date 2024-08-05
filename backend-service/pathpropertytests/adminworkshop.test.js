const request = require('supertest');
const { connectDB, clearDB, cleanup } = require('../models/db.js');
const jwt = require('jsonwebtoken');
const fastCheck = require('fast-check');
const { app, dbConnectionPromise } = require("../app.js");
const setDatabase = require("../systemintegrationtests/setDatabase");


let adminToken;
let workshopId;

beforeAll(async () => {
  // Connect to the test database
  await dbConnectionPromise;
  const ids = await setDatabase();
  adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: 'admin' }, 'root', { expiresIn: '1h' });
  workshopId = ids.workshopId.toString(); 
});

afterAll(async () => {
  // Clean up the database and close the connection
  await clearDB();
  await cleanup();
});

describe('Fuzz Testing Workshop Endpoints', () => {

    describe('Fuzz Testing GET /admin/getworkshop', () => {
        it('should handle various parameters', async () => {
            await fastCheck.assert(
            fastCheck.property(fastCheck.string(), async (param) => {
                // Ensure `param` is a valid query parameter
                const res = await request(app)
                .get(`/admin/getworkshop`)
                .set('Authorization', `Bearer ${adminToken}`)
                .query({ filter: param || 'default' });
        
                expect(res.statusCode).toBe(200);
            })
            );
        });
        });
      

  describe('Fuzz Testing GET /admin/getworkshop/:id', () => {
    it('should handle various workshop IDs', async () => {
      await fastCheck.assert(
        fastCheck.property(fastCheck.uuid(), async (id) => {
          const res = await request(app)
            .get(`/admin/getworkshop/${id}`)
            .set('Authorization', `Bearer ${adminToken}`);

          // You can add more assertions here based on expected behaviors
          if (id === workshopId) {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id', id);
          } else {
            expect(res.statusCode).toBe(404); // Assuming non-existent IDs return 404
          }
        })
      );
    });
  });

  describe('Fuzz Testing PUT /admin/updateworkshop/:id', () => {
    it('should handle various update scenarios', async () => {
      await fastCheck.assert(
        fastCheck.property(fastCheck.string(), fastCheck.string(), fastCheck.string(), async (name, description, location) => {
        // Ensure non-empty strings for name, description, and location
        const validName = name.trim() || "Default Workshop Name";
        const validDescription = description.trim() || "Default Description";
        const validLocation = location.trim() || "Default Location";

        const res = await request(app)
          .put(`/admin/updateworkshop/${workshopId}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            name: validName,
            description: validDescription,
            startDate: "23rd July 2024",
            endDate: "26th July 2024",
            location: validLocation,
            timeStart: "10:00 AM",
            timeEnd: "1:00 PM",
            duration: 3,
            status: "Pending",
            type: "Non-Technical",
            maxParticipants: 25,
            client: {
              "_id": "someClientId",
              "username": "theClient",
              "firstName": "Lewis",
              "lastName": "Hamilton",
              "email": "lewis@example.com",
              "password": "12345",
              "role": "client"
            },
              trainer: {
                "_id": "someTrainerId",
                "username": "theTrainer",
                "firstName": "Sebastian",
                "lastName": "Vettel",
                "email": "sebastian@example.com",
                "password": "12345",
                "role": "trainer",
                "status": "available"
              }
            });

          expect(res.statusCode).toBe(200);
          expect(res.body.code).toBe(200);
          expect(res.body.message).toBe("Workshop successfully updated");
          expect(res.body.workshop.name).toBe(name || "Default Workshop Name");
          expect(res.body.workshop.location).toBe(location || "Default Location");
        })
      );
    });
  });
});
