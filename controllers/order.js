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
    const {totalPrice, userId, productId} = req.body;

    // const userId = req.params.id;
        if(!totalPrice){
            res.status(404).json({ success: false, msg: "All fields are required"})
        }
        else{
            // User.findOne(userId)
            // //     where:{
            // //         userId
            // //     }
            // // })
            // .then(user => {
            //     if(!user){
            //         res.status(400).json({ msg: "User not found"})
            //     }else{
                    Order.create({
                        totalPrice, ProductId : productId, UserId:userId
                    })

                    .then(order => {
                        res.json(order)
                    })
                    .catch(err => res.status(404).json({msg: "Failed to create order"}))
            //     }
            // })
        }
        
    
           
    };