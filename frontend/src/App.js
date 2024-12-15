import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./App.css";

const api_domain = "http://localhost:3001";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  
  const getTask = () => {
    axios
      .get(api_domain)
      .then((res) => {
        setTasks(res.data.taskItems);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  useEffect(() => {
    getTask();
  }, []);

  
  const changeHandler = (e) => {
    setTaskInput(e.target.value);
  };


  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isEditing) {

      axios
        .put(`${api_domain}/task/${currentTaskId}`, { task: taskInput })
        .then(() => {
          setTaskInput("");
          setIsEditing(false);
          setCurrentTaskId(null);
          getTask();
        })
        .catch(() => {
          console.log("Error while updating task");
        });
    } else {

      axios
        .post(api_domain, { task: taskInput })
        .then(() => {
          setTaskInput("");
          getTask();
        })
        .catch(() => {
          console.log("Error while adding task");
        });
    }
  };


  const deleteTask = (id) => {
    axios
      .delete(`${api_domain}/task/${id}`)
      .then(() => {
        getTask();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };


  const editTask = (id, task) => {
    setTaskInput(task);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <form onSubmit={formSubmitHandler}>
        <input type="text" placeholder="Enter task" value={taskInput} onChange={changeHandler}/>
        <input type="submit" value={isEditing ? "Update Task" : "Add Task" }/>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task}
            <div>
              <button
                className="edit"
                onClick={() => editTask(task.id, task.task)}
              >
                <FaEdit />
              </button>
              <button onClick={() => deleteTask(task.id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
