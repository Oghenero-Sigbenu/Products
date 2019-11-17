const Sequelize = require("sequelize");
const sequelize = require("../config/database");
//model
const User = require("../model/user");
const Products = require("../model/products");

class Cart extends Sequelize.Model {
    items = [];
    async createCart(item) {
        let cart = await Cart.findOne({ where: { UserId: item.UserId } });
        if (!cart) {
            cart = await Cart.create({
                quantity: item.quantity,
                total: item.product.price,
                UserId: item.UserId,
                ProductId: item.ProductId,
                items: JSON.stringify([item])
            })
        } else {
            cart = await cart.addToCart(item);
        }
        return cart;
    }

    async addToCart(item) {
        if (!this.checkIfProdExists(item.product.id)) {
            this.items.push(item);
        } else {
            item = this.removeFromCart(item.product.id);
            item.quantity += 1;
            this.items.push(item);
        }
        this.total += item.product.price;
        return await this.update({"items": JSON.stringify(this.items)});
    }

    removeFromCart(productId) {
        let item;
        // console.log(this.items)
        this.items.map((it, idx) => {
            if (productId == it.product.id) {
                item = it;
                console.log("removing from araay");
                this.items.splice(idx, 1);
            }
        })
        // console.log(this.items)
        return item;
    }

    checkIfProdExists(productId) {
        let item = this.items.filter((it, idx) => {
            return productId == it.product.id;
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
        type: Sequelize.TEXT
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
        if (!cart) return;
        if (Array.isArray(cart)) {
            for(let c of cart) {
                // console.log(c.get("items"))
                c.set("items", JSON.parse(c.get("items")));
            }
            return
        }
        c.set("items", JSON.parse(c.get("items")));
    }
}, sequelize });

Cart.belongsTo(User);
Cart.belongsTo(Products);
Products.hasMany(Cart);

module.exports = Cart;