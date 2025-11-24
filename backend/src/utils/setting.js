const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// Determine database path based on environment (Vercel requires /tmp for write access)
let dbPath;
if (process.env.VERCEL) {
  // In Vercel, /tmp is writable
  dbPath = path.join("/tmp", "database.db");
  // If a database exists in the read-only path, copy it to /tmp once for initialization
  const readOnlyDb = path.join(__dirname, "../../data/database.db");
  if (fs.existsSync(readOnlyDb) && !fs.existsSync(dbPath)) {
    fs.copyFileSync(readOnlyDb, dbPath);
  }
} else {
  // Local/dev environment
  dbPath = path.join(__dirname, "../../data/database.db");
  // Ensure data directory exists
  if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }
}

// Create and export a connection in read-write mode
const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Error connecting to SQLite:", err.message);
    } else {
      console.log("Connected to SQLite database at", dbPath);
    }
  }
);

module.exports = { db };
