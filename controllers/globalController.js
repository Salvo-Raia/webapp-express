function index(req, res) {
  res.send("Welcome to Movie Catalogue API");
}

function testError(req, res) {
  x.y.z;
  res.send(
    "You should not be able to see this message. If this is the case, please, check function internalServerError in errorHandlers.js",
  );
}

module.exports = { index, testError };
