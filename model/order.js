  const Sequelize = require("sequelize");
  const sequelize = require("../config/database");

  //model
  const User = require("../model/user");
  const Products = require("../model/products");

  class Order extends Sequelize.Model{}

  Order.init({
      totalPrice:({
        type: Sequelize.INTEGER,
         allowNull: true
      })
    // FOREIGN KEY (user_id) REFERENCES User(user_id) 
  },{sequelize})
  Order.belongsTo(User)
  Order.belongsTo(Products)

  module.exports = Order;