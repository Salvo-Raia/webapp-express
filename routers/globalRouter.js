const express = require("express");
const router = express.Router();
const connection = require("../database/dbConnection");
const { handleFailedQuery } = require("../utils/dbUtils");

// Root
router.get("/", (req, res) => {
  res.send("Welcome to Boolean Movies API!");
});

// Test Error Route
router.get("/test-error", (req, res) => {
  x.y.z;
  res.send(
    "You should not be able to see this message. If this is the case, please, check function internalServerError in errorHandlers.js",
  );
});

// Movies Route
router.get("/movies", (req, res) => {
  const moviesSQL = "SELECT * FROM movies";
  connection.query(moviesSQL, (err, result) => {
    if (err) return handleFailedQuery(err, res);
    console.log(result);
    res.json({
      message: "Movie Catalogue",
      result: result,
      success: true,
    });
  });
});

module.exports = router;
