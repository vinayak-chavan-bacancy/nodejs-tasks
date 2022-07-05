const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const user = require('../models/user');
const { successResponse, errorResponse } = require('../utils');

let userId;

const login = async (req, res) => {
  try {
      const emailID = req.body.emailID;
      const password = req.body.password;
      const userData = await user.findOne({ emailID: emailID });
      if (!userData) {
        return errorResponse(req, res, 'Invalid credentials.', 404);
      }
      const isMatch = await bcrypt.compare(password, userData.password);
      console.log(isMatch)
      if (isMatch) {
          userId = userData._id;
          console.log(userId);
          console.log('user logged in');
          console.log('role:' + userData.role);
      }
      else {
        return errorResponse(req, res, 'Invalid credentials.', 404);
      }
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
}

const register = async (req, res) => {
  try {
      const addinguserRecords = new user(req.body);
      console.log(addinguserRecords);
      const insert = await addinguserRecords.save();
      console.log(insert);
      // const token = generateAccessToken({ username: req.body.emailID });
      // console.log(token);
      console.log('Registration Successful');
      // res.redirect('/');
  } catch (e) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
}

const logout = async (req, res) => {
  console.log(userId + 'logged in');
  userId = null;
  console.log('user logged out');
  console.log(userId);
  // res.redirect('/');
}


module.exports = { login, register, logout, };