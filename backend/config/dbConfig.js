const sql = require("mssql");

const config = {
  user: "sarra", 
  password: "0000", 
  server: "SARRA\\BCDEMO", 
  database: "Demo Database BC (24-0)", 
  options: {
    encrypt: false, // Mets `true` si tu utilises Azure
    trustServerCertificate: true, // À activer si tu rencontres des erreurs SSL
  },
};

async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log("✅ Connecté à SQL Server !");
    return pool;
  } catch (err) {
    console.error("❌ Erreur de connexion à SQL Server :", err);
    process.exit(1); 
  }
}

module.exports = { sql, connectDB };
