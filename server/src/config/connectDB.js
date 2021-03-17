const mongoose = require('mongoose');
const logger = require('../utils/logger');

const CONNECTION_URL = process.env.MONGO_URL;
const connectDB = async () => {
  const conn = await mongoose
    .connect(CONNECTION_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      userFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((conn) => {
      logger.info(`Mongoose Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      logger.error(`Error occured: ${err}`);
    });
};

module.exports = connectDB;
