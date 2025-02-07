const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
// const router = require('./routes');
const session = require("express-session");
const app = express();
const indexRouter = require('./routes/index');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require("path");

// var usersRouter = require('./routes/users');
// app.use('/users', usersRouter);

app.use(cors({
    origin: ["http://localhost:8081","http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: 'sessions',
        }),
        cookie: {
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
  
    })
);

  
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/', indexRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 8081;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
