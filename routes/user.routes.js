const express = require("express");

const { login, register, logout, } = require('../controllers/userController');

const route = express.Router();

route.post('/login', login)
route.post('/register', register);
route.get('/logout', logout);

module.exports = route;