const express = require("express");
const authController = require("../../controllers/auth")

const route = express.Router();

route.post("/login", authController.login);


module.exports = route; 