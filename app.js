const express = require("express");
const app = express();
const logger = require("./middlewares/logger");
const errorHandlers = require("./middlewares/errorHandlers");

// Middlewares
app.use(logger);
app.use(express.static("public"));
app.use(express.json());
app.use(errorHandlers.notFound);
app.use(errorHandlers.internalServerError);

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Boolean Movies API!");
});

app.get("/test-error", (req, res) => {
  x.y.z;
  res.send("You should not be able to see this message");
});

// Server start
app.listen(3000, () => {
  console.log("Server is listening");
});
