require('./db/connection');
const dotenv = require('dotenv');
const express = require('express');


const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const subtaskRoutes = require('./routes/subtask.routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/', userRoutes);
app.use('/', taskRoutes);
app.use('/', subtaskRoutes);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
});