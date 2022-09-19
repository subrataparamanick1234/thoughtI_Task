/* This is importing the express module and creating an express application. */
const express = require("express");
require("express-async-errors");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

/***************************/
/* Morgan is a middleware that logs all the requests to the console.
bodyParser is a middleware that parses the body of the request and makes it available in the
req.body object. */
app.use(morgan("prod"));
app.use(bodyParser.json());

/* This is a middleware that allows the server to accept requests from other domains. */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With , Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT , POST , DELETE ,GET, PATCH"
    );
    return res.status(200).json({});
  }
  next(); //continue
});

/* This is importing the task_route and user_route modules and using them as middleware. */
const taskRoute = require("./routes/task_route");
const userRoute = require("./routes/user_routes");

app.use("/api", taskRoute);
app.use("/api", userRoute);

/* This is a middleware that handles the error when the user enters a wrong URL. */
app.use((req, res, next) => {
  req.status = 200;
  const error = new Error("server is running but you enter worng URL");

  next(error);
});

/* This is a middleware that handles the error when the user enters a wrong URL. */
if (app.get("env") === "production") {
  app.use("/", (error, req, res, next) => {
    if (req.status) {
      res.send({
        status: "ok",
        message: "Hi, welcome to production",
      });
    } else {
      res.send({ error: error });
    }
  });
}

/* This is a middleware that handles the error when the user enters a wrong URL. */
app.use("/", (error, req, res, next) => {
  if (req.status) {
    res.send({
      status: "ok",
      message: "Hi, welcome to Development",
      stack: error.stack,
    });
  } else {
    res.send({ error: error });
  }
  next(error);
});

/** server listen */
app.listen(port, () => {
  console.log("server is up and running " + port);
});
