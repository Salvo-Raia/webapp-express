function notFound(req, res, next) {
  return res.status(404).json({
    message: "Error 404 - Not found!",
    success: false,
  });
}

function internalServerError(req, res, next) {
  return res.status(500).json({
    message: "Error 500 - Internal server error",
    success: false,
  });
}

module.exports = { notFound, internalServerError };
