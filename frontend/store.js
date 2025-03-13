import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./store/taskSlice"; // ✅ Ensure correct path

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
