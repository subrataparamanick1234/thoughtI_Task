/* Importing the data.json file. */
let getData = require("../model/data.json");

/**
 * It takes in a request and a response object, and sends back a JSON object with a status, message,
 * and data
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const getAllUser = (req, res) => {
  res.send({
    status: true,
    message: "Successfully get all Users",
    data: getData.Users,
  });
};

module.exports = {
  getAllUser,
};
