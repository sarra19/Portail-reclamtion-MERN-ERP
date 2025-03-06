const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MSSQLStore = require('connect-mssql-v2'); 
const cors = require('cors');
const path = require("path");
const { sql, connectDB } = require("./config/dbConfig")
const app = express();
const indexRouter = require('./routes/index');
require('dotenv').config(); // Charger les variables d'environnement
app.set('trust proxy', 1); // Faire confiance au premier proxy
app.use(cors({
    origin: ["http://localhost:8081","https://portail-reclamtion-mern-erp.onrender.com"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: new MSSQLStore({ 
            client: sql, 
            config: {
                user: "sarradb", 
                password: "201JFT201&too", 
                server: "https://dev.azure.com/nvsarra8/_git/DynaAssist", 
                database: "sarrademo", 
                options: {
                    encrypt: false, 
                    trustServerCertificate: true, 
                },
            },
        }),
        cookie: {
            httpOnly: true, // Pour empêcher l'accès côté client
            secure: true, // Obligatoire pour 'None'
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 // 1 jour
        }
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', indexRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8081;

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("🚀 Serveur démarré sur le port " + PORT);
      
    });
});