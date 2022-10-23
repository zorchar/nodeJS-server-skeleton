const express = require("express");
const cors = require("cors");

const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const sucessHandlerMiddleware = require("./middleware/successHandlerMiddleware");

const professorRouter = require("./routers/professorRouter");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/professors", professorRouter);

app.use(sucessHandlerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
