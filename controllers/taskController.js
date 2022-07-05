const mongoose = require('mongoose');

const task = require('../models/task');
const { successResponse, errorResponse } = require('../utils');

const viewTasks = async (req, res) => {
  try {
    const taskData = await task.find();
    if(!taskData){
      return errorResponse(req, res, 'Task Not Found', 404);
    }
    else{
      return successResponse(req, res, taskData, 200);
    }
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const viewOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const matchedTask = await task.findOne({ _id: id });
    if (!matchedTask) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }
    return successResponse(req, res, matchedTask, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.body)
    const payload = {
      title,
      status: 'Not Started',
    };
    const newTask = new task(payload);
    console.log(newTask);
    const insertTask = await newTask.save();
    console.log(insertTask);
    console.log('insert successful');
    return successResponse(req, res, insertTask, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await task.findOne({ _id: id });
    if (!taskData) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }
    const taskDetails = await task.findByIdAndUpdate(id, {
      title: req.body.title,
      status: req.body.status,    
    });
    return successResponse(req, res, 'Update Successful', 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await task.findOne({ _id: id });
    if (!taskData) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }
    const deleteTaskData = await task.findByIdAndDelete(id);
    return successResponse(req, res, deleteTaskData, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};


module.exports = { viewTasks, viewOneTask, addTask, updateTask, deleteTask };