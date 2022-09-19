/* Importing the express module and the getAllTask function from the task.js file. */
const express = require("express");

const { getAllTask } = require("../controller/task");

/* This is creating a route for the getAllTask function. */
const router = express.Router();

router.get("/get-tasks", getAllTask);

module.exports = router;
