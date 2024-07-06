const mongoose = require('mongoose');

const connection_str = "mongodb://root:example@localhost:27017/";

const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    // Establishes connection to the MongoDB server
    const conn = await mongoose.connect(connection_str);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed: ", error);
    //console.log(error);
    process.exit(1);
  }

}

async function cleanup() {
  await mongoose.disconnect();
}

module.exports = connectDB;

module.exports = { connectDB,  cleanup };
