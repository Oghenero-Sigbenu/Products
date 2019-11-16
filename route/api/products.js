const express = require("express");
const productController = require("../../controllers/products");
const upload = require("../../middlewarre/upload")

const route = express.Router();

route.post("/create", upload.single('imgUrl'), productController.create);
route.get("/get", productController.getAll);
route.get("/:id", productController.getProductById);

module.exports = route;