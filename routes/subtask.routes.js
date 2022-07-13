const express = require("express");

const { addSubtask, viewSubtasks, updateSubtask, deleteSubtask, viewOneSubtask } = require('../controllers/subtaskController');
const {auth} = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

const route = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *    subtask:
 *      type: object
 *      required:
 *        - title
 *        - taskid
 *      properties:
 *        id: 
 *          type: string
 *          description: The auto generated id of subtask
 *        title: 
 *          type: string
 *          description: The title of subtask
 *        taskid:
 *          type: string
 *          description: The id of task
 */

/**
 * @swagger
 * components:
 *  post:
 *    summary: Create a new subtask
 *    tags: [subtasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/subtask'
 *      responses:
 *        200:
 *          description: The subtask created successfully
 *          content:
 *            application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/subtask'
 *        500:
 *          description: Some server error
 */
route.post("/task", auth, isAdmin, addTask);

/**
 * @swagger
 * /task:
 *  get:
 *    summary: Return the list of all the subtasks
 *    responses:
 *      200:
 *        description: The list of the subtasks
 *        content:
 *          application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/subtask'
 *      500:
 *        description: Some server error
 */
route.get("/subtasks/:taskid", auth, viewSubtasks);

/**
 * @swagger
 * /task/{id}:
 *   get:
 *    summary: Get the subtask by id
 *    tags: [subtask]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: The subtaskid
 *   response:
 *    200:
 *      description: The subtaskdescription by id
 *      contents:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/subtask'
 *    404:
 *      description: The subtaskis not found
 */
route.get("/subtask/:id", auth, viewOneSubtask);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *    summary: Update the subtaskby id
 *    tags: [task]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: The subtaskid
 *   response:
 *    200:
 *      description: The subtaskdescription by id
 *      contents:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/task'
 *    404:
 *      description: The subtaskis not found
 */
route.put("/subtask/:id", auth, isAdmin, updateSubtask);

/**
 * @swagger
 * /subtask/{id}:
 *   delete:
 *    summary: Delete the subtask by id
 *    tags: [task]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: The subtaskid
 *   response:
 *    200:
 *      description: The subtask description by id
 *      contents:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/task'
 *    404:
 *      description: The subtask is not found
 */
route.delete("/subtask/:id", auth, isAdmin, deleteSubtask);


module.exports = route;