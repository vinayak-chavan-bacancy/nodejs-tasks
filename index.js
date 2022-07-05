require('./db/connection');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/', userRoutes);
// app.use('/', adminRoutes);


app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
})