const express = require("express");
const { getTasks, createTask, deleteTask } = require("../controllers/taskController");

const router = express.Router();

// Task Endpoints
router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);

module.exports = router;
