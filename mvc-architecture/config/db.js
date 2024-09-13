const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected sucessfully at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting with database : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
