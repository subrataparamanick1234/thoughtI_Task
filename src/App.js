import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "./api";
import { RiFlag2Fill, RiFlag2Line } from "react-icons/ri";
import { BiMinusCircle } from "react-icons/bi";
import { HiMinusCircle } from "react-icons/hi";
import moment from "moment";
import { toast } from "react-toastify";
function App() {
  /* A state variable. */
  const [allTasks, setAllTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userInput, setUserInput] = useState({
    Task: "",
    Expiry_date: "",
    User: "",
    Important: false,
    Created_on: "",
  });
  const [error, setError] = useState({
    Task: "",
    Expiry_date: "",
    User: "",
    Important: false,
    Created_on: "",
  });

  useEffect(() => {
    /**
     * It makes a GET request to the server, and then sets the state of the tasks to the data that was
     * returned from the server
     */
    async function getTask() {
      try {
        const { data } = await axios.get("get-tasks");
        setAllTasks(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    /**
     * The function is an asynchronous function that uses the axios library to make a get request to the
     * backend route "get-users" and then sets the state of the allUsers variable to the data returned
     * from the backend
     */
    async function getUser() {
      try {
        const { data } = await axios.get("get-users");
        setAllUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    getTask();
  }, []);

  /**
   * The function takes in an event object as an argument and then uses the event object to get the
   * name and value of the input field that was changed.
   *
   * The function then checks if the name of the input field is "Task" and if the length of the value
   * is 0. If both of these conditions are true, then the function sets the error state for the Task
   * input field to "Task is Required".
   *
   * The function then checks if the name of the input field is "Task" and if the length of the value
   * is greater than or equal to 200. If both of these conditions are true, then the function sets the
   * error state for the Task input field to "max 200 words !".
   *
   * The function then checks if the name of the input field is "Task" and if the length of the value
   * is greater than 0 and less than 200. If both of these conditions are true, then the function sets
   * the error state for the Task input
   * @param e - The event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Task") {
      if (value.length === 0) {
        setError({ ...error, Task: "Task is Required" });
        setUserInput({ ...userInput, [name]: "" });
      } else if (value.length >= 200) {
        setError({ ...error, Task: "max 200 words !" });
        setUserInput({ ...userInput, [name]: "" });
      } else {
        setError({ ...error, Task: "" });
        setUserInput({ ...userInput, [name]: value });
      }
    }
    if (name === "Expiry_date") {
      if (value.length === 0) {
        setError({ ...error, Expiry_date: "Expiry date is Required" });
        setUserInput({ ...userInput, [name]: "" });
      } else if (moment(value).format("L") <= moment(new Date()).format("L")) {
        setError({ ...error, Expiry_date: "not enter past date" });
        setUserInput({ ...userInput, [name]: "" });
      } else {
        setError({ ...error, Expiry_date: "" });
        setUserInput({ ...userInput, [name]: value });
      }
    }
    if (name === "User") {
      if (value.length === 0) {
        setError({ ...error, User: "User is Required" });
        setUserInput({ ...userInput, [name]: "" });
      } else {
        setError({ ...error, User: "" });
        setUserInput({ ...userInput, [name]: value });
      }
    }
  };

  /**
   * It takes the user input and adds it to the array of all tasks
   * @param e - The event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.Task) {
      setError({ ...error, Task: "Task is Required" });
    } else if (!userInput.Expiry_date) {
      setError({ ...error, Expiry_date: "Expiry date is Required" });
    } else if (!userInput.User) {
      setError({ ...error, User: "User is Required" });
    } else {
      setAllTasks([...allTasks, userInput]);
      setUserInput({
        Task: "",
        Expiry_date: "",
        User: "",
        Important: false,
        Created_on: "",
      });
      toast.success("Successfully Added !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  /**
   * It takes the index of the task to be deleted and removes it from the array of tasks
   * @param e - The event object
   * @param index - The index of the field to be removed.
   */
  const handleRemoveFields = (e, index) => {
    e.preventDefault();
    const values = [...allTasks];
    values.splice(index, 1);
    setAllTasks(values);
    toast.success("Successfully Deleted !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="App">
      <div className="total-form">
        <div className="container">
          <form className="new-form">
            <div className="form-heading">
              <h2>Registration Form</h2>
            </div>

            <div className="total-form1">
              <div className="for-border">
                <div className="row">
                  <div className="col-lg-3">
                    <input
                      type="text"
                      placeholder="Task Description"
                      name="Task"
                      value={userInput.Task}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className="input-bottom">
                      <p>Task</p>
                      <p>{userInput.Task.length}/200</p>
                    </div>
                    <span style={{ color: "red" }}>{error.Task}</span>
                  </div>
                  <div className="col-lg-3">
                    <input
                      type="date"
                      placeholder="12th may 2022"
                      value={userInput.Expiry_date}
                      onChange={(e) => handleChange(e)}
                      name="Expiry_date"
                    />
                    <div className="input-bottom">
                      <p>Expiary Date</p>
                    </div>
                    <span style={{ color: "red" }}>{error.Expiry_date}</span>
                  </div>
                  <div className="col-lg-3">
                    <select
                      name="User"
                      value={userInput?.User}
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Choose User Type</option>
                      {allUsers.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <div className="input-bottom">
                      <p>Users</p>
                    </div>
                    <span style={{ color: "red" }}>{error.User}</span>
                  </div>
                  <div className="col-lg-1">
                    <span
                      onClick={() =>
                        setUserInput({
                          ...userInput,
                          Important: !userInput.Important,
                        })
                      }
                    >
                      {userInput.Important ? <RiFlag2Fill /> : <RiFlag2Line />}
                    </span>
                  </div>
                  <div className="col-lg-2">
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
              <div className="total-table">
                <table>
                  <tbody>
                    <tr>
                      <th>Task</th>
                      <th>Expairy Date</th>
                      <th>Users</th>
                      <th>Important</th>
                      <th>Action</th>
                    </tr>
                    {allTasks.map((item, i) => (
                      <tr key={i}>
                        <td>{item.Task}</td>
                        <td>{moment(item.Expiry_date).format("L")}</td>
                        <td>
                          <select>
                            <option>{item.User}</option>
                          </select>
                        </td>
                        <td>
                          {item.Important ? <RiFlag2Fill /> : <RiFlag2Line />}
                        </td>
                        <td>
                          {i >= 3 ? (
                            <HiMinusCircle
                              onClick={(e) => handleRemoveFields(e, i)}
                            />
                          ) : (
                            <>
                              <BiMinusCircle />
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
