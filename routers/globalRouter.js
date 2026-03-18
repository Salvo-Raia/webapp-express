// Imports
const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

// Root
router.get("/", (req, res) => {
  res.send("Welcome to Boolean Movies API!");
});

// CRUD Routes
router.get("/index", moviesController.index);
router.get("/:id", moviesController.show);
router.post("/", moviesController.store);
router.put("/:id", moviesController.update);
router.patch("/:id", moviesController.modify);
router.delete("/:id", moviesController.destroy);

// Test Error Route
router.get("/test-error", (req, res) => {
  x.y.z;
  res.send(
    "You should not be able to see this message. If this is the case, please, check function internalServerError in errorHandlers.js",
  );
});

module.exports = router;
