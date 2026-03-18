// Imports
const express = require("express");
const globalRouter = express.Router();
const globalController = require("../controllers/globalController");

globalRouter.get("/", globalController.index);
globalRouter.get("/test-error", globalController.testError);

module.exports = globalRouter;
