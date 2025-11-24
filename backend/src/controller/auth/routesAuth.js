const express = require("express");
const routesAuth = express.Router();
const { Register } = require("./Register");
const { Login } = require("./Login");
const { Refresh } = require("./Refresh");

routesAuth.post("/register", Register);
routesAuth.post("/login", Login);
routesAuth.post("/refresh", Refresh);

module.exports = routesAuth;
