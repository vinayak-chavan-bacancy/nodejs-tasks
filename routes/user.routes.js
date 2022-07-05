const express = require("express");

const { loginview, login, register, logout, } = require('../controllers/userController');

const route = express.Router();

route.get('/', loginview);
route.post('/login', login)
route.post('/register', register);
route.get('/logout', logout);

module.exports = route;