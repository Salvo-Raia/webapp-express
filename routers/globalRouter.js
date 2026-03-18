const express = require("express");
const router = express.Router();
const connection = require("../database/dbConnection");

// Root
router.get("/", (req, res) => {
  res.send("Welcome to Boolean Movies API!");
});

// Test Error Route
router.get("/test-error", (req, res) => {
  x.y.z;
  res.send("You should not be able to see this message");
});

// Movies Route
router.get("/movies", (req, res) => {
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

module.exports = router;
