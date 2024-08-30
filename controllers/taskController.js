const db = require('../models/taskModel');
const { createTaskSchema, updateTaskSchema } = require('./validations/taskValidation');

const getAllTasks = (req, res) => {
    try {
        db.all('SELECT * FROM tasks', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const createTask = (req, res) => {
    try {
        const { error, value } = createTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { title, description } = value;

        db.run(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [title, description],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to create task' });
                }
                res.status(201).json({
                    id: this.lastID,
                    title,
                    description,
                    completed: false,
                });
            }
        );
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateTask = (req, res) => {
    try {
        const { error, value } = updateTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { title, description, completed } = value;

        db.run(
            'UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, description, completed, id],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to update task' });
                }
                if (this.changes === 0) {
                    return res.status(404).json({ error: 'Task not found' });
                }
                res.status(200).json({ message: 'Task updated successfully' });
            }
        );
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;

        db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete task' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};
