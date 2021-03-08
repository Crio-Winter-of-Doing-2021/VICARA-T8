import express from "express";
import http from "http";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import morgan from "morgan";
import users from "./routes/users.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

//DB Connection
// TODO: Seprate the DB Connection
// db Connection
const CONNECTION_URL = process.env.MONGO_URL;
mongoose
  .connect(CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    userFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    logger.info(`Mongoose Connected: ${conn.connection.host}`);
  })
  .catch((err) => {
    logger.error(`Error occured: ${err}`);
  });

//Middlewares

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/api", users);

// TODO: Seprate the Server Connection
//Start Server

var server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
module.exports = app;
