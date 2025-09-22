// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../config/db.config.js');

// GET all tasks
router.get('/', (req, res) => {
    const query = 'SELECT * FROM tasks ORDER BY priority DESC, due_date ASC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve tasks.' });
        res.json(results);
    });
});

// POST a new task
router.post('/', (req, res) => {
    const { task_text, due_date, priority } = req.body;
    const query = 'INSERT INTO tasks (task_text, due_date, priority) VALUES (?, ?, ?)';
    db.query(query, [task_text, due_date, priority], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to add task.' });
        res.status(201).json({ id: result.insertId, task_text, is_completed: false, due_date, priority });
    });
});

// PUT to update a task
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const { is_completed, task_text, due_date, priority } = req.body;
    const query = 'UPDATE tasks SET is_completed = ?, task_text = ?, due_date = ?, priority = ? WHERE id = ?';
    db.query(query, [is_completed, task_text, due_date, priority, taskId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update task.' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found.' });
        res.json({ message: 'Task updated successfully.' });
    });
});

// DELETE a task
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [taskId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete task.' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found.' });
        res.json({ message: 'Task deleted successfully.' });
    });
});

module.exports = router;