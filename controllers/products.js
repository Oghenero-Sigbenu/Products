const Products = require("../model/products");
const User = require("../model/user");

exports.create = (req, res,  next) => {
    const {name, description, features, price, imgUrl} = req.body;
        // let imgUrl;
            // if(req.path){
            //     imgUrl = req.file.path;
            Products.create({
                name, description, features, price, imgUrl
            })
                .then(product => {
                    res.json(product)
                })
                .catch(err => res.status(401).json({ msg : "Failed to create products" || err}))
};

exports.getAll = (req, res,next) => {
    Products.findAll({
        include: [{
            all: true
        }]
    })
    .then((product) => {
        console.log(product)
       return res.status(200).json({ msg: "Groups found succesfully", data: product });
    })
    .catch(err => {
        res.status(400).json({ msg: "Error occured while fetching the data", err })
      })
};