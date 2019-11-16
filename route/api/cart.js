const express = require("express");
const cartController = require("../../controllers/cart");
const authenticate = require("../../middlewarre/auth");

const route = express.Router();

route.post("/create", cartController.create);
route.get("/get",  cartController.getAll);
route.get("/get/:id", cartController.getOneCartItem);
route.get("/user/:id",  cartController.getUserCart);

module.exports = route;