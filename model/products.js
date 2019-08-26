const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class Products extends Sequelize.Model {}
    
Products.init({
        name:{
            type: Sequelize.STRING(),
            allowNull: false
        },
        description:{
            type: Sequelize.STRING(),
            allowNull: false
        },
        features:{
            type: Sequelize.STRING(),
            allowNull: true
        },
        price:{ 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        imgUrl:{
            type: Sequelize.STRING(),
            allowNull: true
        }
    }, {sequelize});

    module.exports = Products;