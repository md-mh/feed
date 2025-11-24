const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./src/controller/routes");
const http = require("http");
// Check if running in Vercel Serverless environment
const IS_SERVERLESS = !!process.env.VERCEL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
const server = http.createServer(app);

if (!IS_SERVERLESS) {
  const port = process.env.PORT || 5000;
  server
    .listen(port, () => {
      console.log(`App listening on port ${port}`);
    })
    .on("error", (err) => {
      console.error(`${err} `);
      process.exit(1);
    });
}

// Routes
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Server Running....");
});

// In serverless, export the app without starting the listener.
module.exports = app;
