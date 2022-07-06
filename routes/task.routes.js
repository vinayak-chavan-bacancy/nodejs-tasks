const express = require("express");

const { viewTasks, viewOneTask, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const {auth} = require('../middleware/auth');

const route = express.Router();

route.post('/task', auth, addTask);
route.get('/task', auth, viewTasks);
route.get('/task/:id', auth, viewOneTask)
route.put('/task/:id', auth, updateTask);
route.delete('/task/:id', auth, deleteTask);

module.exports = route;