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

module.exports = { index };
