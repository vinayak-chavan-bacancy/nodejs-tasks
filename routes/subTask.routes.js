const express = require("express");

const { addSubtask, viewSubtasks, updateSubtask, deleteSubtask, viewOneSubtask } = require('../controllers/subtaskController');
const {auth} = require('../middleware/auth');

const route = express.Router();

route.post('/subtask/:taskid', auth, addSubtask);
route.get('/subtasks/:taskid', auth, viewSubtasks);
route.get('/subtask/:id', auth,viewOneSubtask);
route.put('/subtask/:id', auth, updateSubtask);
route.delete('/subtask/:id', auth, deleteSubtask);

module.exports = route;