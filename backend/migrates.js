const fs = require("fs");
const path = require("path");
const { db } = require("./src/utils/setting");

const initSql = fs.readFileSync(
  path.join(__dirname, "src/utils/init.sql"),
  "utf8"
);
db.exec(initSql, (err) => {
  if (err) console.error("Error initializing DB:", err);
  else console.log("Database initialized successfully!");
});
