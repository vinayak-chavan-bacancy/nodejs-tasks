const mongoose = require('mongoose');
const Schema = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      require: true,
      trim: true
    }
  },
  { 
    timestamps: true 
  }
);

const task = new mongoose.model('task', taskSchema);

module.exports = task;
