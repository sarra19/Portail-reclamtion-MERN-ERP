const sql = require("mssql");
require('dotenv').config();

const config = {
  user: process.env.DB_USER || "sarradb", // Fallback value
  password: "201JFT201&too", // Fallback value
  server: process.env.DB_HOST,//"SARRA\\BCDEMO", 
  database: process.env.DB_NAME || "sarrademo", // Fallback value
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    console.log("Attempting to connect to SQL Server with config:", config);
    const pool = await sql.connect(config);
    console.log("✅ Connecté à SQL Server !");
    return pool;
  } catch (err) {
    console.error("❌ Erreur de connexion à SQL Server :", err);
    process.exit(1); // Exit the process with an error code
  }
}

module.exports = { sql, connectDB };