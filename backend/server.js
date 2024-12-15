const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;


app.use(cors());
app.use(bodyParser.json());


let taskItems = [];


app.get("/", (req, res) => {
  res.status(200).json({
    taskItems,
    count: taskItems.length,
  });
});


app.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: "Task cannot be empty" });
  }

  taskItems.push({ id: Date.now(), task });
  res.status(201).json({ message: "Task added successfully", taskItems });
});


app.delete("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  const index = taskItems.findIndex((item) => item.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  taskItems.splice(index, 1);
  res.status(200).json({ message: "Task deleted successfully", taskItems });
});


app.put("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { task } = req.body;

  const index = taskItems.findIndex((item) => item.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!task) {
    return res.status(400).json({ message: "Task cannot be empty" });
  }

  taskItems[index].task = task;
  res.status(200).json({ message: "Task updated successfully", taskItems });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
