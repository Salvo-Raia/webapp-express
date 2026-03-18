//Imports
const connection = require("../database/dbConnection");
const {
  handleFailedQuery,
  handleResourceNotFound,
} = require("../utils/dbUtils");

// Index controller
function index(req, res) {
  const moviesSQL =
    "SELECT movies.*, AVG(reviews.vote) as average_vote FROM db_movies.movies INNER JOIN reviews ON movie_id = reviews.movie_id GROUP BY movies.id ORDER BY movies.id ASC";
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
  connection.query(moviesSQL, [id], (err, movieResult) => {
    if (err) return handleFailedQuery(err, res);
    const [movie] = movieResult;
    if (!movie) return handleResourceNotFound(res);

    const reviewsSQL = "SELECT * FROM reviews WHERE movie_id = ?";
    connection.query(reviewsSQL, [id], (err, reviewResult) => {
      if (err) return handleFailedQuery(err, res);
      movie.reviews = reviewResult;
      res.json({
        message: `Movie Detail for movie ${id}`,
        result: movie,
        success: true,
      });
    });
  });
}

function store(req, res) {}

function update(req, res) {}

function modify(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, modify, destroy };
