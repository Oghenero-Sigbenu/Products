const Sequelize = require("sequelize");
const sequelize = require("../config/database");
//model
const User = require("../model/user");
const Products = require("../model/products");

class Cart extends Sequelize.Model {
    items = array();
    async createCart(item) {
        let cart = await this.findOne({ where: { UserId: item.UserId, ProductId: item.ProductId } });
        if (!cart) {
            cart = await this.create({
                quantity: item.quantity, 
                total: item.product.price, 
                UserId: item.UserId, 
                ProductId: item.ProductId,
                items: [item]
            })
        } else {
             cart = await this.addToCart(item);
        }
        return cart;
    }

    async addToCart(item) {
        if (!this.checkIfProdExists(item.ProductId)) {
            this.items.push(item);
        } else {
            item[0].quantity += 1;
        }
        this.total += item.product.price;
        return await this.save();
    }

    removeFromCart(productId) {

    }

    checkIfProdExists(productId) {
        let item = this.items.filter((it, idx) => {
            return item.ProductId == it.ProductId;
        });
        return item.length > 0;
    }
}

Cart.init({
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    items: {
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { hooks: {
    beforeSave: (cart, options) => {
        cart.items = JSON.stringify(cart.items);
    },
    afterFind: (cart, options) => {
        cart.items = JSON.parse(cart.items);
    }
}, sequelize });

Cart.belongsTo(User);
Cart.belongsTo(Products);
Products.hasMany(Cart);

module.exports = Cart;