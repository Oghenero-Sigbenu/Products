const bcrypt = require('bcryptjs');  //importing bcryptjs
const jwt = require("jsonwebtoken"); //importing jsonwebtoken

const User = require("../model/user");


//user signUp 
exports.register = (req, res, next) => {
    const {name, phone, email, password} = req.body;
        if(!name || !phone || !email || !password){
            res.status(400).json("All fields are required")
        }
        //check if email exist
        User.findOne({
            where:{
                email
            }
        })
        .then(user => {
            if(user){
                return res.status(400).json({ msg:  "User already exist"})
            }else{
                let hashedPassword;
                try{
                    const salt = bcrypt.genSaltSync(10);
                    hashedPassword = bcrypt.hashSync(password, salt);
                }catch(error){
                    throw error;
                }
                //create user and assign a token
                User.create({
                    name, phone, email, password: hashedPassword
                })
                .then(user => {
                    jwt.sign(
                        { id: user.id },process.env.AUTH_SECRET_KEY,{ expiresIn: "24h"}, (err,token) => {
                            return res.json({
                                token,
                                user
                        });
                });
            })
            .catch(err => res.json({ msg: err.message || "Not created"}))
        }
    })
    .catch(err => res.json({ msg: err.message || "Failed to create user"}))  
};

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.json({ msg: "failed", error: err }))
}