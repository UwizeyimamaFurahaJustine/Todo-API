import express from 'express';
import { addTodos, getTodos, updateTodos, deleteTodos} from '../controllers/todoController';
import { authenticateToken } from '../middleware/authentication';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todos operations
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Add todo
 *     tags: [Todos]
 *     description: Add todo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *                 type: string
 *               
 *     responses:
 *       201:
 *         description: Todo added successfully
 *       400:
 *         description: Bad request, missing required parameters or invalid email format
 *       500:
 *         description: Internal server error
 */




router.post('/', authenticateToken, addTodos);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get Todos
 *     tags: [Todos]
 *     description: Retrieve a list of all todos.
 *     responses:
 *       200:
 *         description: A list of todos
 *       500:
 *         description: Internal server error
 */

router.get('/', authenticateToken, getTodos);


/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     description: Update an existing todo with the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *             required:
 *               - completed
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       400:
 *         description: Bad request, missing required parameters
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */



router.put('/:id', authenticateToken, updateTodos);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     description: Delete an existing todo with the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: todo deleted
 *       404:
 *         description: todo not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', authenticateToken, deleteTodos);

export default router;
