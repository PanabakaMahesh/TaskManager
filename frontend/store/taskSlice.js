import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch tasks from backend
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/tasks");
    return Array.isArray(response.data) ? response.data : []; // ✅ Ensure array
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload; // ✅ Ensure payload is an array
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
