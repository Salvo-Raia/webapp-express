//Imports
const connection = require("../database/dbConnection");
const { handleFailedQuery } = require("../utils/dbUtils");

// Index controller
function index(req, res) {
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
}

// Show controller
function show(req, res) {
  const { id } = req.params;
  const moviesSQL = "SELECT * FROM movies WHERE id = ?";
  connection.query(moviesSQL, [id], (err, result) => {
    if (err) return handleFailedQuery(err, ers);
    res.json({
      message: `Movie Detail for movie ${id}`,
      result: result[0],
      success: true,
    });
  });
}

function store(req, res) {}

function update(req, res) {}

function modify(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, modify, destroy };
