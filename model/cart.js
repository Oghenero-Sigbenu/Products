const Sequelize = require("sequelize");
const sequelize = require("../config/database");
//model
const User = require("../model/user");
const Products = require("../model/products");
const Item = require("../model/item");

class Cart extends Sequelize.Model {
    async createCart(data) {
        let item = new Item(data);
        let cart = await Cart.findOne({ where: { UserId: data.UserId }, include: [
            { all: true }
        ] });

        if (!cart) {
            console.log(item.price);
            cart = new Cart();
            cart.set("total", item.price)
            cart.set("UserId", data.UserId);
            cart.set("items", [item.toJson()]);

            await cart.save();
            // console.log(cart);

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
        this.set("total", item.product.price);
        return await this.update({"items": (this.items)});
    }

    removeFromCart(productId) {
        let item;
        // console.log(this.items)
        // this.items = JSON.parse(this.items);
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
        // console.log("*****************", this.items)
        // this.items = JSON.parse(this.items)
        let item = this.items.filter((it, idx) => {
            return productId == it.product.id;
        });
        return item.length > 0;
    }
}

Cart.init({
    items: {
        type: Sequelize.TEXT
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { hooks: {

    beforeValidate: (cart, options) => {
        // cart.items = JSON.stringify(cart.items);
        cart.set("items", JSON.stringify(cart.get("items")));
    },
    afterFind: (cart, options) => {
        // console.log(">>>>>>>>>>>>>>>>", options)
        if (!cart) return;
        if (Array.isArray(cart)) {
            for(let c of cart) {
                // console.log(c.get("items"))
                c.set("items", JSON.parse(c.get("items")));
            }
            return
        }
        cart.set("items", JSON.parse(cart.get("items")));
    },

}, sequelize });

Cart.belongsTo(User);
// Cart.belongsTo(Products);
// Products.belongsToMany(Cart);

module.exports = Cart;