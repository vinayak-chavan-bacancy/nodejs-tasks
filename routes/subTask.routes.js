const express = require("express");

const { addSubtask, viewSubtasks, updateSubtask, deleteSubtask, viewOneSubtask } = require('../controllers/subtaskController');

const route = express.Router();

route.post('/subtask/:taskid', addSubtask);
route.get('/subtasks/:taskid', viewSubtasks);
route.get('/subtask/:id', viewOneSubtask);
route.put('/subtask/:id', updateSubtask);
route.delete('/subtask/:id', deleteSubtask);

module.exports = route;