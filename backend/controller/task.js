/* Importing the data.json file. */
let getData = require("../model/data.json");


/**
 * It returns a JSON object containing all the tasks
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const getAllTask = (req, res) => {
  res.send({
    status: true,
    message: "Successfully get all tasks",
    data: getData.Tasks,
  });
};

module.exports = {
  getAllTask,
};
