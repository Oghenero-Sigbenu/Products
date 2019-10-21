import React, {Component} from "react";
import {connect} from "react-redux";

//components
import imag from "../assets/file/watch.jpg";
import Header from "./Common/Header";
import Button from "./Common/Button";

//action
import {getProductById} from "../store/actions/product";
import {addToCart} from "../store/actions/cart";

class ProductDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            cart:[{
                id: 2,
                name: "aer",
                img: "yyyy",
                description: "love",
                price: 20
             } ]
        }
    }
    componentDidMount(){
        const id = +this.props.match.params.id;
        console.log(id)
        this.props.getProductById(id)
    }
   addToCart (product){
    // const {user} = this.props;
    // this.props.addToCart({
    //     quantity: +1, total: products.price ,UserId: user.id, ProductId: products.id
    // })
}
render(){
        const {oneProduct} = this.props;
    console.log(oneProduct)
        return(
            <>
            <Header/>
            <div className="detail" key={oneProduct && oneProduct.id}  > 
                <div>
                    <img src={imag} alt="product"></img>
                </div>
                <div className="detail-text">
                    <h2>{oneProduct && oneProduct.name}</h2>
                    <h2>{oneProduct && oneProduct.name}</h2>
                    <h2>{oneProduct && oneProduct.name}</h2>
                    <p>As low as <strong>₦{oneProduct && oneProduct.price}</strong></p>
                    <p>{oneProduct && oneProduct.description}</p>
                    <div className="quantity">
                        <button className="add">-</button>
                        <input type="text" name="qty"></input>
                        <button className="add">+</button>
                    </div>
                    <Button onclick={this.addToCart} >Add to cart</Button>
                </div>
            </div>
            </>
        );
    };
};

const mapStateToProps = (state) => {
    const {oneProduct} = state.products;
    return{
        oneProduct
    }
};
export default connect(mapStateToProps, {getProductById, addToCart})(ProductDetail);