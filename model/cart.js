const Sequelize = require("sequelize");
const sequelize = require("../config/database");
//model
const User = require("../model/user");
const Products = require("../model/products");

class Cart extends Sequelize.Model {}
    
Cart.init({
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
    },{sequelize});

    Cart.belongsTo(User);
    Cart.belongsTo(Products);
    Products.hasMany(Cart);
    
    module.exports = Cart;