const mongoose = require('mongoose');

const task = require('../models/task');
const subtask = require('../models/subtask');

const { successResponse, errorResponse } = require('../utils');

const addSubtask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const matchedTask = await task.findOne({ _id: taskid });
    if (!matchedTask) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }
    const { title } = req.body;
    console.log(req.body)
    const payload = {
      title,
      taskID: taskid
    };
    const newSubtask = new subtask(payload);
    console.log(newSubtask);
    const insertTask = await newSubtask.save();
    console.log(insertTask);
    console.log('insert successful');
    return successResponse(req, res, insertTask, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const viewSubtasks = async (req, res) => {
  try {
    const { taskid } = req.params;
    const matchedTask = await task.findOne({ _id: taskid });
    if (!matchedTask) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }
    const matchedSubtask = await subtask.find({ taskID: taskid });
    if (!matchedSubtask) {
      return errorResponse(req, res, 'Nothing to show', 404);
    }
    return successResponse(req, res, matchedSubtask, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const updateSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await subtask.findOne({ _id: id });
    if (!taskData) {
      return errorResponse(req, res, 'Subtask Not Found', 404);
    }
    const taskDetails = await subtask.findByIdAndUpdate(id, {
      title: req.body.title,   
    });
    return successResponse(req, res, 'Updated Successful', 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const deleteSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await subtask.findOne({ _id: id });
    if (!taskData) {
      return errorResponse(req, res, 'Subtask Not Found', 404);
    }
    const deleteTaskData = await subtask.findByIdAndDelete(id);
    return successResponse(req, res, deleteTaskData, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const viewOneSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const matchedTask = await subtask.findOne({ _id: id });
    if (!matchedTask) {
      return errorResponse(req, res, 'Subtask Not Found', 404);
    }
    return successResponse(req, res, matchedTask, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};


module.exports = { addSubtask, viewSubtasks, updateSubtask, deleteSubtask, viewOneSubtask };