const mongoose = require("mongoose");
const Admin = require("./admin");
const Client = require("./client");
const Trainer = require("./trainer");
const Workshop = require("./workshopRequest");

const connection_str = "mongodb://root:example@localhost:27017/";

// const client = new MongoClient(connection_str);
const dbName = "dell-mongodb";
const source = "?authSource=admin";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connection_str + dbName + source);
    console.log(`Attempting to connect to MongoDB at ${connection_str + dbName + source}`);
    //console.log('Connection Details:', conn.connection);
    console.log(
      `MongoDB Connected @ ${conn.connection.host}:${conn.connection.port}`
    );
    return conn;
  } catch (err) {
    console.error("MongoDB Connection Failed: ", err);
    process.exit(1);
  }
};


// Clear all collections
const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

async function cleanup() {
  await mongoose.disconnect();
}



module.exports = { connectDB, clearDB, cleanup };
