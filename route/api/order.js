const express = require("express");
const orderController = require("../../controllers/order");

const route = express.Router();

route.get("/getAll", orderController.getAll);
route.post("/create", orderController.create);

module.exports = route;