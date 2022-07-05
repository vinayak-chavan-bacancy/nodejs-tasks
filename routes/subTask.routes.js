const express = require("express");

const { addSubtask, viewSubtasks, updateSubtask, updateSubtask  } = require('../controllers/taskController');

const route = express.Router();

route.post('/subtask/:id', addSubtask);
route.get('/subtask/:id', viewSubtasks);
route.put('/subtask/:id', updateSubtask);
route.delete('/subtask/:id', updateSubtask);

module.exports = route;