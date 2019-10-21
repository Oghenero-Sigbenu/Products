  const Sequelize = require("sequelize");
  const sequelize = require("../config/database");

  //model
  const User = require("../model/user");
  const Cart = require("../model/cart");
  const Products = require("../model/Products");

  class Order extends Sequelize.Model{}

  Order.init({
      quantity:({
        type: Sequelize.INTEGER,
         allowNull: true
      }),
      total:({
        type: Sequelize.INTEGER,
         allowNull: true
      })
  // FOREIGN KEY (user_id) REFERENCES User(user_id) 
  },{sequelize})

// Associations for our models
Order.belongsTo(User);
Order.belongsTo(Cart);
Order.belongsTo(Products);

module.exports = Order;