const User = require("../model/user");
const Products = require("../model/products");
const Cart = require("../model/cart");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.create = (req, res, next) => {
    const {
        quantity,
        ProductId,
        UserId
    } = req.body;
    // const UserId = req.userId;
    User.findByPk(UserId)
        .then(async (user) => {
            if (!user) {
                return res.status(500).json({
                    msg: "User does not exist",
                    error: err
                })
            } else {

                let product = await Products.findByPk(ProductId);
                if (!product) return res.status(404).json({
                    message: "Product not found",
                    status: "error"
                })
                let cart = new Cart();
                cart.createCart({
                        quantity,
                        UserId,
                        product
                    })
                    .then(createdCart => {
                        res.status(200).json({
                            msg: "Cart created successfully",
                            data: JSON.parse(createdCart.items)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        next(new Error(err.message))
                    });
            }
        })
        .catch(err => next(new Error(err || "error fetching user or user does not exist")))
};


exports.getAll = (req, res, next) => {
    Cart.findAll({
            include: [{
                all: true
            }]
        })
        .then(cart => {
            res.json(cart)
        })
        .catch(err => res.json({
            msg: err.message || "Error occured"
        }))
};

// exports.getUserCart = (req, res, next) => {
//     const id = req.params.id;

//     Cart.findAll({
//         where: {
//             userId: id
//         },
//         include: [
//             { all: true }
//         ]
//     })
//         .then(carts => {
//             let products = [];
//             let user = carts[0].User
//             carts.forEach(cart => {
//                 let cart_details = {
//                     id: cart.id,
//                     total: cart.total,
//                     quantity: cart.quantity
//                 }
//                 products.push({ product: cart.Product, cart_details })
//             });
//             res.status(200).json({ msg: "Cart fetch successfully", data: { products, user } })
//         })
//         .catch(err => res.json({ msg: "Error occured", success: false, err }))

// };

exports.getUserCart = (req, res, next) => {
    const id = req.params.id;

    Cart.findAll({
            where: {
                userId: id
            },
            include: [{
                all: true
            }]
        })
        .then(carts => {

            res.status(200).json({
                msg: "Cart fetch successfully",
                data: carts
            })
        })
        .catch(err => res.json({
            msg: "Error occured",
            success: false,
            err
        }))

};

exports.getOneCartItem = (req, res, next) => {
    const id = req.params.id;
    Cart.findOne({
            where: {
                id
            },
            include: [{
                all: true
            }]
        })
        .then(cart => {
            res.json(cart)
        })
        .catch(err => next(err || "Error now"))
}