// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./config/db.config.js');
const tasksRouter = require('./routes/tasks.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Main API route for tasks
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});