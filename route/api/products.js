const express = require("express");
const productController = require("../../controllers/products");
const upload = require("../../middlewarre/upload")

const route = express.Router();

route.get("/get", productController.getAll);
route.post("/create",  productController.create);

module.exports = route;