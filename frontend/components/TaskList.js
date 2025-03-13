import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "../store/taskSlice"; // Ensure correct path

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state) => state.tasks); // ✅ Default to empty array

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error}</p>;

  return (
    <ul>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <li key={task._id}>
            {task.name}
            <button onClick={() => dispatch(deleteTask(task._id))}>Delete</button>
          </li>
        ))
      )}
    </ul>
  );
}
