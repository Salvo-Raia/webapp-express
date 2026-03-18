const express = require("express");
const app = express();
const globalRouter = require("./routers/globalRouter");
const errorHandlers = require("./middlewares/errorHandlers");

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use(globalRouter);

// Error Handler Middlewares
app.use(errorHandlers.notFound);
app.use(errorHandlers.internalServerError);

// Server start
app.listen(process.env.APP_PORT, () => {
  console.log("Server enviroment: " + process.env.APP_MODE);
  console.log(
    "Server is listening on " +
      process.env.APP_URL +
      ", port " +
      process.env.APP_PORT,
  );
});
