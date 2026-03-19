//Imports
const connection = require("../database/dbConnection");
const {
  handleFailedQuery,
  handleResourceNotFound,
} = require("../utils/dbUtils");

// Index controller
function index(req, res) {
  const moviesSQL =
    "SELECT movies.id, movies.title, movies.director, movies.genre, movies.release_year, movies.abstract, movies.image, AVG(reviews.vote) as average_vote FROM db_movies.movies INNER JOIN reviews ON movie_id = reviews.movie_id GROUP BY movies.id ORDER BY movies.id ASC";
  connection.query(moviesSQL, (err, moviesResult) => {
    if (err) return handleFailedQuery(err, res);
    const movies = moviesResult.map((movie) => {
      return {
        ...movie,
        average_vote: parseInt(movie.average_vote),
        image: buildMovieImagePath(movie.image),
      };
    });

    res.json({
      message: "Movie Catalogue",
      result: movies,
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

    const reviewsSQL =
      "SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at DESC";
    connection.query(reviewsSQL, [id], (err, reviewResult) => {
      if (err) return handleFailedQuery(err, res);
      movie.reviews = reviewResult;
      movie.image = buildMovieImagePath(movie.image);
      res.json({
        message: `Movie Detail for movie ${id}`,
        result: movie,
        success: true,
      });
    });
  });
}

function store(req, res) {}

// Store Review controller
const storeReview = (req, res) => {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const storeReviewSQL =
    "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";

  connection.query(storeReviewSQL, [id, name, vote, text], (err, result) => {
    console.log(result.insertId);

    const showReviewSQL = "SELECT * FROM reviews WHERE id = ?";

    connection.query(showReviewSQL, [result.insertId], (err, result) => {
      const [review] = result;
      res.send(result);
    });
  });
};

function update(req, res) {}

function modify(req, res) {}

function destroy(req, res) {}

function buildMovieImagePath(image) {
  return `${process.env.APP_URL}:${process.env.APP_PORT}/movies_covers/${image}`;
}

module.exports = { index, show, store, storeReview, update, modify, destroy };
