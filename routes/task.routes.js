const express = require("express");

const { viewTasks, viewOneTask, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { auth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

const route = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    task:
 *      type: object
 *      required:
 *        - title
 *        - status
 *      properties:
 *        id: 
 *          type: string
 *          description: The auto generated id of task
 *        title: 
 *          type: string
 *          description: The title of task
 *        status:
 *          type: string
 *          description: The status of task
 */

/**
 * @swagger
 * components:
 *  post:
 *    summary: Create a new task
 *    tags: [tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/task'
 *      responses:
 *        200:
 *          description: The task created successfully
 *          content:
 *            application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/task'
 *        500:
 *          description: Some server error
 */
route.post("/task", auth, isAdmin, addTask);

/**
 * @swagger
 * /task:
 *  get:
 *    summary: Return the list of all the tasks
 *    responses:
 *      200:
 *        description: The list of the tasks
 *        content:
 *          application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/task'
 *      500:
 *        description: Some server error
 */
route.get('/task', auth, viewTasks);

/**
 * @swagger
 * /task/{id}:
 *   get:
 *    summary: Get the task by id
 *    tags: [task]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: The task id
 *   response:
 *    200:
 *      description: The task description by id
 *      contents:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/task'
 *    404:
 *      description: The task is not found
 */
route.get('/task/:id', auth, viewOneTask);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *    summary: Update the task by id
 *    tags: [task]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: The task id
 *   response:
 *    200:
 *      description: The task description by id
 *      contents:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/task'
 *    404:
 *      description: The task is not found
 */
route.put('/task/:id', auth, isAdmin, updateTask);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *    summary: Delete the task by id
 *    tags: [task]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: The task id
 *   response:
 *    200:
 *      description: The task description by id
 *      contents:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/task'
 *    404:
 *      description: The task is not found
 */
route.delete('/task/:id', auth, isAdmin, deleteTask);

module.exports = route;