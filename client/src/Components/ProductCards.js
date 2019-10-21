import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

//action
import {setSelectedProduct} from "../store/actions/product";
import {addToCart} from "../store/actions/cart";
import {login} from "../store/actions/auth";

import imag from "../assets/file/watch.jpg";
import Button from "./Common/Button";
class ProductCards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            total: 20,
        }
        this.addToCart = this.addToCart.bind(this);
        this.remove = this.remove.bind(this);
        this.navigate = this.navigate.bind(this);
    };
    
    addToCart (products){
        const {user} = this.props;
            this.props.addToCart({
                quantity: +1, total: products.price ,UserId: user.id, ProductId: products.id
            })
    };
    navigate(path) {
        this.setState({
          show: false
        });
        setTimeout(() => {
          this.push(path);
        }, 500);
      };
    remove (products){
        // const {cart} = this.state;
        // const newItem = {...product,unit:1}
        // this.setState(prevState =>({
        //     cart: prevState.cart.pop(newItem),
        //     // product: 239
        // }))
        // console.log(products)
    }
    render(){
        const {product} = this.props;
        console.log(product)
        return(
        <>
        <div className="products">
            {product && product.map(( products) => (
                <div  className="cards" key={products.id}>
                    <NavLink to={`/products/${products.id}`}>
                        {/* <div className='image-card'> */}
                            <img src={imag} alt="product"></img>
                        {/* </div> */}
                    </NavLink>
                        <div className="cards-text">
                                <h4>{products.name}</h4>
                                <p>{product.name}</p>
                            <span>₦ {products.price}</span>
                        </div>
                    <Button onclick={()=>this.addToCart(products)}>Add to cart</Button>
                </div>
            )) }
        </div>
        
        </>
    )
    };
};

const mapStateToProps = (state) => ({
   user: state.auth.user
});

export default connect(mapStateToProps, {setSelectedProduct, addToCart})(ProductCards);