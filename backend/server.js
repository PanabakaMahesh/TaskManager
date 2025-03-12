const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected!"))
.catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Routes
app.use("/api/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
