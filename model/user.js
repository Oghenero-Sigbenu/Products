const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model {}
    
User.init({
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        phone:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
    },{sequelize});

module.exports = User;