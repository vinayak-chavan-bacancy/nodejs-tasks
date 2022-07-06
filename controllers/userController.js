const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const user = require('../models/user');
const { successResponse, errorResponse } = require('../utils');

const login = async (req, res) => {
  try {
    const emailID = req.body.emailID;
    const password = req.body.password;
    const userData = await user.findOne({ emailID: emailID });
    if (!userData) {
      return errorResponse(req, res, 'Invalid credentials.', 404);
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    if(!isMatch){
      return errorResponse(req, res, 'Invalid credentials.', 404);
    } else {
      let accessToken = userData.getToken({exp: 60*60, secret: process.env.ACCESS_TOKEN_SECRET})
      await userData.save()
      return res.status(200).send({ accessToken })
    }
  } catch (error) {
    return errorResponse(req, res, error.message, 400, { err: error });
  }
}

const register = async (req, res) => {
  try {
    console.log(req.body);
      const addinguserRecords = new user(req.body);
      console.log(addinguserRecords);
      const emailID = req.body.emailID;
      const userData = await user.findOne({ emailID: emailID });
      if (userData) {
        return errorResponse(req, res, 'email ID allready exist', 400);
      }
      else {
        const insert = await addinguserRecords.save();
        console.log(insert);
        console.log('Registration Successful');
        return successResponse(req, res, insert, 200);
      }
  } catch (e) {
    return errorResponse(req, res, 'something went wrong', 400, { err: e });
  }
}

const logout = async (req, res) => {
  console.log(userId + 'logged in');
  userId = null;
  console.log('user logged out');
  console.log(userId);
  // res.redirect('/');
}


module.exports = { login, register, logout };