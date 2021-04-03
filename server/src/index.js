const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const morgan = require('morgan');
const auth = require('./routes/auth');
const file = require('./routes/file');
const { verifyAccessToken } = require('./utils/jwtHelper');
const errorHandler = require('./middleware/errorHandler');
const passport = require('passport');
const busboy = require('connect-busboy');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/connectDB.js');
connectDB();
dotenv.config();

const app = express();
//TODO : CORS ERROR , BackPressuringThis effectively allows a fixed amount of memory to be used at any given time for a [.pipe()][] function. There will be no memory leakage, no infinite buffering, and the garbage collector will only have to deal with one area in memory! Watermark

//Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(passport.initialize());
app.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024,
  })
);

// Routes
app.use('/api/auth', auth);
app.use('/api', verifyAccessToken, file);
app.use(errorHandler);

// TODO: Seprate the Server Connection
// Setup Connection on and off
//Start Server

var server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));

//Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server
  server.close(() => process.exit(1));
});

module.exports = app;
