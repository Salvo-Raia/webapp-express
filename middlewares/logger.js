function logRequest(req, res, next) {
  console.log(`${req.method} ${res.url}`);

  next();
}

module.exports = logRequest;
