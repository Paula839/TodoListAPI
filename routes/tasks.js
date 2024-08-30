// routes/tasks.js
const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints for managing tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Retrieve all tasks
 *     responses:
 *       200:
 *         description: A list of tasks.
 *       500:
 *         description: Internal server error.
 */
router.get('/', getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Bad request, missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post('/', createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', deleteTask);

module.exports = router;
