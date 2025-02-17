const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();
//
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // console.log(err);
  console.log(err.status);
  res.status(err.status || 500).json({
    // status: "failed",
    // code: err.status,
    message: err.message,
  });
});
module.exports = app;
