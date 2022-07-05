const express = require("express");

const { viewTasks, viewOneTask, addTask, updateTask, deleteTask } = require('../controllers/taskController');

const route = express.Router();

route.post('/task', addTask);
route.get('/task', viewTasks);
route.get('/task/:id', viewOneTask)
route.put('/task/:id', updateTask);
route.delete('/task/:id', deleteTask);

module.exports = route;