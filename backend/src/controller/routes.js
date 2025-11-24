const express = require("express");
const routes = express.Router();
const routesAuth = require("./auth/routesAuth");

routes.use("/auth", routesAuth);

module.exports = routes;
