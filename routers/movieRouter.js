// Imports
const express = require("express");
const movieRouter = express.Router();
const moviesController = require("../controllers/moviesController");

// CRUD Routes
movieRouter.get("/", moviesController.index);
movieRouter.get("/:id", moviesController.show);
movieRouter.post("/", moviesController.store);
movieRouter.put("/:id", moviesController.update);
movieRouter.patch("/:id", moviesController.modify);
movieRouter.delete("/:id", moviesController.destroy);

module.exports = movieRouter;
