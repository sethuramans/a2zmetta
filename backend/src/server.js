const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const rewardsRoutes = require('./routes/rewards');
const tasksRoutes = require('./routes/tasks');
const tasksActionRoutes = require('./routes/tasksAction');
const authenticateToken = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);

app.use('/api/user', authenticateToken, userRoutes);

app.use("/api/rewards", authenticateToken, rewardsRoutes);

app.get("/api/profile", authenticateToken, (req, res) => {
  console.log(
    'profile'
  );
  res.json({ message: "Access granted", user: req.user });
});

app.use("/api/tasks", authenticateToken, tasksRoutes);

app.use("/api/tasks-action", authenticateToken, tasksActionRoutes);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
