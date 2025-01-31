const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
const indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// app.use('/users', usersRouter);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/', indexRouter);

const PORT = process.env.PORT || 8081;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
