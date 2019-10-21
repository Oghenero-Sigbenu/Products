const bcrypt = require('bcryptjs');  //importing bcryptjs
const jwt = require("jsonwebtoken"); //importing jsonwebtoken
const User = require("../model/user");

//user login
exports.login = (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)
    //check if fields are empty 
    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" })
    }
    //checks user is registered
    else {
        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ msg: err.message || "User does not exist" });
                }
                bcrypt
                    //checks is password matches user password
                    .compare(password, user.password)
                    .then(match => {
                        //if it does not match
                        if (!match) {
                            return res.status(400).json({ msg:"Invalid Password"});
                        }
                        //login the user if it matches the password then assign a token
                        jwt.sign({ userId: user.id },
                            process.env.AUTH_SECRET_KEY,
                            { expiresIn: "24h" },
                            (err, token) => {
                                res.json({
                                    token,
                                    user
                                })
                            })
                    })

                    .catch(err => res.status(400).json({ msg: err.message || "failed to login" }))
            })
            .catch(err => res.status(400).json({ msg: err.message || "failed to login" }))

    }
};

exports.getCurrentUser = (req, res, next) => {
    const userId = req.userId;
    User.findByPk(userId, {
        attributes: { exclude: ["password", "updatedAt"] }
    })
        .then(user => {
            res.json(user);
        })
        .catch(error =>
            res
                .status(500)
                .json({ msg: "Something went wrong while fetching the user", error })
        );
};