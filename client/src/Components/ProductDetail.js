import React, {Component} from "react";
import {connect} from "react-redux";

//components
import imag from "../assets/file/watch.jpg";

//action
import {setSelectedProduct} from "../store/actions/product";

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
    // componentDidMount(){
    //     this.props.setSelectedProduct()
    // }
   addToCart (product){
       console.log(product)
   }
    render(){
        console.log(this.props.product)
        const {product} = this.props;
        return(
            <>
            <div className="detail"> 
                <div>
                    <img src={imag} alt="product"></img>
                </div>
                <div>
                    <h2>{product.name}</h2>
                    <input type="number"></input>
                    <button onClick={this.addToCart}>Add to cart</button>
                    <p>{product.description}</p>
                </div>
            </div>
            </>
        );
    };
};

const mapStateToProps = (state) => ({
    product: state.products.selectedProduct
});
export default connect(mapStateToProps, {setSelectedProduct})(ProductDetail);