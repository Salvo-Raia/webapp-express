const express = require("express");
const app = express();
const errorHandlers = require("./middlewares/errorHandlers");
const connection = require("./database/dbConnection");

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

// Movies Route
app.get("/movies", (req, res) => {
  const moviesSQL = "SELECT * FROM movies";
  connection.query(moviesSQL, (err, result) => {
    if (err)
      res.status(500).json({
        message: "Database query failed",
        success: false,
      });
    console.log(result);
    res.json({
      message: "Movie Catalogue",
      result: result,
      success: true,
    });
  });
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
