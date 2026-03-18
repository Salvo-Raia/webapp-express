function handleFailedQuery(err, res) {
  const responseData = {
    message: "Database query failed",
    success: false,
  };

  if (process.env.APP_MODE === "dev") {
    responseData.error = err.message;
  }

  console.log(err.message);
  return res.status(500).json(responseData);
}

function handleResourceNotFound(res) {
  res.status(404).json({
    message: "Resource not found",
    success: false,
  });
}

module.exports = { handleFailedQuery, handleResourceNotFound };
