const User = require("../model/user");
const Products = require("../model/products");
const Cart = require("../model/cart");

exports.create = (req, res, next) => {
    const {quantity, total, ProductId, UserId} = req.body;
    // const UserId = req.userId;
        User.findByPk(UserId)
            .then(user => {
                    Cart.create({
                        quantity, total, UserId, ProductId
                    })
                    .then(cart => {
                        res.json(cart)
                    })
                    .catch(err => console.log("lol"))
            })
            .catch(err => console.log("error occured"))
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
        .catch(err =>res.json({msg : "Error occured" || err.messages}))
};

exports.getUserCart = (req, res, next) => {
    const id = req.params.id;
            
    Cart.findAll({
                where: {
                   userId:id
                },
                include: [
                   { model: Products,
                    as: 'products',
                    where: {
                    userId:id
                    }}
            ]
            })
            .then(carts => {
                res.status(200).json({msg: "Cart fetch successfully", data: carts})
            })
            .catch(err => res.json({msg: "Error occured", success: false, err }))
        
    };

exports.getCneCartItem = (req, res,next) => {
    const id = req.params.id;
    Cart.findAll({
        where: {
            id
        },
         include: [{
            all: true
        }]
    })
            .then(cart =>{
                res.json(cart)
            })
            .catch(err => console.log("Error now"))
            }
