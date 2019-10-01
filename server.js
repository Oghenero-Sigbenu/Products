// allows our project read variables from .env files
require("dotenv").config();  

const express = require("express");
const sequelize = require("./config/database");
const path = require("path");

// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");

//importing routes
const userRoutes = require("./route/api/user");
const authRoutes = require("./route/api/auth");
const productRoutes = require("./route/api/products");
const orderRoutes = require("./route/api/order");
const cartRoutes = require("./route/api/cart");

const app = express();

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());
app.use(cors());


// Create a static directory for our uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//setting a base path
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync() 
    .then(result => {
    app.listen(PORT, () => console.log("Server is running on port 5000"))
})
    .catch((err) => console.log(err || "failed to connect"))