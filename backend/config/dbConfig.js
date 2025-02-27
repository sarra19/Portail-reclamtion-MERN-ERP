const sql = require("mssql");
require('dotenv').config();

const config = {
  user: process.env.DB_USER , 
  password: process.env.DB_PASSWORD ,
  server: process.env.DB_HOST , 
  database:"Demo Database BC (24-0)" , 
  options: {
    encrypt: false,
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