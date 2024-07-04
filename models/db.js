const MongoClient = require("mongodb").MongoClient;

const connection_str = "mongodb://root:example@localhost:27017/";

const client = new MongoClient(connection_str);

const dbName = "dell-mongodb";

let db;

async function connectDB() {
  try {
    // Establishes connection to the MongoDB server
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
}

function getDB() {
  return db;
}


async function cleanup() {
  await client.disconnect();
}

module.exports = { connectDB, getDB, cleanup };
