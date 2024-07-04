// const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const connection_str = "mongodb://root:example@localhost:27017/";

// const client = new MongoClient(connection_str);
const dbName = "dell-mongodb";
const source = "?authSource=admin";

var db = null;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connection_str + dbName + source);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB Connection Failed: ", err);
    process.exit(1);
  }
};

async function cleanup() {
  await mongoose.disconnect();
}

module.exports = { connectDB, cleanup };
