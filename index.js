require('./db/connection');
const dotenv = require('dotenv');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const subtaskRoutes = require('./routes/subtask.routes');

dotenv.config();
const port = process.env.PORT || 8000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TODO API",
            version: "1.0.0",
            description: "todo app API"
        },
        servers: [
            {
                url: "http://localhost:8000"
            }   
        ],
    },
    apis: ["./routes/*.js"],
}

const specs = swaggerJsDoc(options)
const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/', userRoutes)
app.use('/', taskRoutes);
app.use('/', subtaskRoutes);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
});