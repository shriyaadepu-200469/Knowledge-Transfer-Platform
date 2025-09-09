const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

const app = express(); // <-- Move this to the top

app.use(cors()); // <-- Now this works

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Knowledge Platform Backend is running");
});

// All route imports
const userRoutes = require('./routes/user');
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const teamRoutes = require("./routes/team");
const resourceRoutes = require("./routes/resource");
const accessRoutes = require('./routes/accessRoutes');
const githubActivityRoute = require('./routes/github');

// Route uses
app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/resources", resourceRoutes);
app.use('/api', accessRoutes);
app.use('/api', githubActivityRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});