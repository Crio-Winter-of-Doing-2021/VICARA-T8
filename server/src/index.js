import express from "express";
import http from "http";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import morgan from "morgan";
import users from "./routes/users.js";

dotenv.config();

const app = express();

//Middlewares

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/api", users);

//Start Server

var server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
module.exports = app;
