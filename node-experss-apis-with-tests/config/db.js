const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(`✅ Database connected successfully at ${conn.connection.host}!`);
  })
  .catch((err) => {
    console.log(`❌ Error while connecting with database: ${err}`);
  });
}

module.exports = connectDB;
