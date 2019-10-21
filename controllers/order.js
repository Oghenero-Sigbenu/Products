const User = require("../model/user");
const Order = require("../model/order");
const Products = require("./products");

exports.getAll = (req, res, next) => {
    Order.findByPk()
        .then(orders => {
            res.json()
        })
        .catch(err => res.status(400).json({ msg : "Failed to fetch"}));
};

exports.create = (req, res, next) => {
    const {total, quantity, userId, productId, CartId} = req.body;

    // const userId = req.params.id;
        if(!total || !quantity){
            res.status(404).json({ success: false, msg: "All fields are required"})
        }
        else{
            User.findOne({
                where:{
                    id: userId
                }
            })
            .then(user => {
                if(!user){
                    res.status(400).json({ msg: "User not found"})
                }else{
                    Order.create({
                        total, quantity, ProductId : productId, UserId:userId,CartId
                    })

                    .then(order => {
                        res.json(order)
                    })
                    .catch(err => res.status(404).json({msg: "Failed to create order"}))
                }
            })
        }
        
    
           
    };