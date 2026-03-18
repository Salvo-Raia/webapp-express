const express = require("express");
const app = express();
const errorHandlers = require("./middlewares/errorHandlers");

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Boolean Movies API!");
});

app.get("/test-error", (req, res) => {
  x.y.z;
  res.send("You should not be able to see this message");
});

// Error Handler Middlewares
app.use(errorHandlers.notFound);
app.use(errorHandlers.internalServerError);

// Server start
app.listen(process.env.APP_PORT, () => {
  console.log("Server enviroment: " + process.env.APP_MODE);
  console.log(
    "Server is listening on " +
      process.env.APP_URL +
      ", port " +
      process.env.APP_PORT,
  );
});
