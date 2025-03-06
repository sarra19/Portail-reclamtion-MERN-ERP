const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MSSQLStore = require('connect-mssql-v2');
const cors = require('cors');
const path = require("path");
const { sql, connectDB } = require("./config/dbConfig");
require('dotenv').config(); // Charger les variables d'environnement

const app = express();
const indexRouter = require('./routes/index');

app.use(cors({
    origin: ["https://portail-reclamtion-mern-erp.onrender.com"], // Remplace par ton domaine de production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Permet l'envoi des cookies
}));

// Middleware pour afficher les cookies envoyés
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Configuration de la session
app.use(
    session({
        secret: "secret", // Clé secrète pour signer les cookies
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
            httpOnly: true, // Empêche l'accès aux cookies côté client
            secure: true, // Nécessaire pour HTTPS
            sameSite: "none", // Assurez-vous que c'est bien en minuscule
            maxAge: 1000 * 60 * 60 * 24 // 1 jour
        }
    })
);

// Middleware pour parser les corps des requêtes
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test pour voir les cookies envoyés
app.use((req, res, next) => {
    console.log("🔹 Cookies envoyés:", res.getHeaders()["set-cookie"]);
    next();
});

// Lancer le serveur
const PORT = process.env.PORT || 8081;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("🚀 Serveur démarré sur le port " + PORT);
    });
});
