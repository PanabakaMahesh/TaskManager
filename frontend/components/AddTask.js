import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice"; // ✅ Ensure correct path

export default function AddTask() {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!taskName.trim()) return;
    try {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName, completed: false }),
      });
      dispatch(fetchTasks()); // ✅ Refresh tasks after adding
      setTaskName("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}
