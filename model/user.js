const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model {}
    
User.init({
        name:{
            type: Sequelize.STRING(),
            allowNull: false
        },
        phone:{
            type: Sequelize.STRING(),
            allowNull: false
        },
        email:{
            type: Sequelize.STRING(),
            allowNull: false
        },
        password:{
            type: Sequelize.STRING(),
            allowNull: false
        },
    },{sequelize});

module.exports = User;