const Sequelize = require("sequelize");

//create a sequelize instance
const sequelize = new Sequelize("e_commerce", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;