const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const morgan = require('morgan');
const auth = require('./routes/auth');
const file = require('./routes/file');
const { verifyAccessToken } = require('./utils/jwtHelper');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const passport = require('passport');
const busboy = require('connect-busboy');

dotenv.config();

const app = express();
//TODO : CORS ERROR , BackPressuringThis effectively allows a fixed amount of memory to be used at any given time for a [.pipe()][] function. There will be no memory leakage, no infinite buffering, and the garbage collector will only have to deal with one area in memory! Watermark
//DB Connection
// TODO: Seprate the DB Connection
// db Connection Disconnection
const CONNECTION_URL = process.env.MONGO_URL;
mongoose
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

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(passport.initialize());
app.use(busboy());

//Routes
// app.get('/api', verifyAccessToken, async (req, res, next) => {
//   res.send('Protected Routes');
// });

app.use('/api', file);
app.use('/api/auth', auth);
app.use(errorHandler);

// TODO: Seprate the Server Connection
// Setup Connection on and off
//Start Server

var server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
module.exports = app;
