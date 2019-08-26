const Products = require("../model/products");
const User = require("../model/user");
exports.create = (req, res,  next) => {
    const {name, description, features, price, imgUrl} = req.body;
        // let imgUrl;
            const userId = req.userId;

            // if(req.path){
            //     imgUrl = req.file.path;
            // }
            User.findByPk(userId)
                .then(user => {
                    Products.create({
                        name, description, features, price, imgUrl
                    })
                        .then(product => {
                            res.json(product)
                                console.log(product)
                        })
                                    .catch(err => res.status(400).json({ msg : "No User found"}))
})
                                        .catch(err => res.status(401).json({ msg : "Failed to create products"}))
};

exports.getAll = (req, res,next) => {
    Products.findAll()
    .then((product) => {
        res.json(product)
    })
    .catch(err => res.json({ msg: "Failed to Fetch"}))
};