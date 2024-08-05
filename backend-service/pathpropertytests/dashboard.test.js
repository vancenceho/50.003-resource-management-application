const request = require('supertest');
const setDatabase = require("../systemintegrationtests/setDatabase");
const jwt = require("jsonwebtoken");
const { connectDB, clearDB, cleanup } = require("../models/db.js");
const { app, dbConnectionPromise } = require("../app.js");
const fc = require('fast-check');

describe('Dashboard Management', () => {
    let adminToken;

    beforeAll(async () => {
        // Connect to the test database
        await dbConnectionPromise;
        const ids = await setDatabase();
        adminToken = jwt.sign({ AdminId: ids.adminId.toString(), role: "admin" }, "root", { expiresIn: "1h" });
    });

    afterAll(async () => {
        // Clean up the database and close the connection
        await clearDB();
        await cleanup();
    });

    describe('Fuzzing Test - getWorkshopsCountForTrainers', () => {
        it('should handle various combinations of startMonth and endMonth', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.option(fc.date({ min: new Date(2020, 0, 1), max: new Date(2025, 11, 31) }), { nil: undefined }),
                    fc.option(fc.date({ min: new Date(2020, 0, 1), max: new Date(2025, 11, 31) }), { nil: undefined }),
                    async (startMonth, endMonth) => {
                        const startMonthStr = startMonth ? startMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) : undefined;
                        const endMonthStr = endMonth ? endMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) : undefined;

                        const res = await request(app)
                            .get(`/admin/dashboard/workshopscount`)
                            .set('Authorization', `Bearer ${adminToken}`)
                            .query({ startMonth: startMonthStr, endMonth: endMonthStr });

                        if (!startMonthStr || !endMonthStr) {
                            expect(res.status).toBe(400);
                            expect(res.body.message).toBe('Start month and end month are required');
                        } else if (new Date(startMonthStr) > new Date(endMonthStr)) {
                            expect(res.status).toBe(400);
                            expect(res.body.message).toBe('Start month cannot be after end month');
                        } else {
                            expect(res.status).toBe(200);
                            expect(res.body.data).toBeDefined();
                        }
                    }
                )
            );
        });
    });
});