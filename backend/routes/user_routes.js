/* Importing the express module and the getAllUser function from the user.js file. */
const express = require("express");

const { getAllUser } = require("../controller/user");

/* This is creating a route for the getAllUser function. */
const router = express.Router();

router.get("/get-users", getAllUser);

module.exports = router;
