const User = require("../model/user");
const Products = require("../model/products");
const Cart = require("../model/cart");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.create = (req, res, next) => {
    const {quantity, total, ProductId, UserId} = req.body;
    // const UserId = req.userId;
        User.findByPk(UserId)
            .then(user => {
                if(user){
                    Products.findOne({
                        where:{
                            id: ProductId
                        }
                    })  
                    .then(existingProduct => {
                        Cart.update({
                            quantity: quantity +1
                        })
                        .then(updatedProduct => {
                            Cart.create({
                                quantity, total, UserId, ProductId
                            })
                            .then(createdCart => {
                                res.status(200).json({msg: "Cart created successfully", data: createdCart})
                            })
                            .catch(err =>{
                                return res.status(500).json({
                                    msg: "Something went wrong creating cart",
                                    error: err
                            })
                        })
                })
                })
            }else{
                res.status(400).json("User does not exist")
            }
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
                   {all:true}
            ]
            })
            .then(carts => {
                let products = [];
                let user = carts[0].User
                carts.forEach(cart => {
                    let cart_details = {
                        id : cart.id,
                        total : cart.total,
                        quantity : cart.quantity
                    }
                    products.push({product:cart.Product,cart_details})
                });
                res.status(200).json({msg: "Cart fetch successfully", data:{ products, user}})
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
