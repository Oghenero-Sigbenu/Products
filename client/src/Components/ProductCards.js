import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
//action
import {setSelectedProduct} from "../store/actions/product";
import {addToCart} from "../store/actions/cart";
import {login} from "../store/actions/auth";

import imag from "../assets/file/watch.jpg";

class ProductCards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            total: 20,
        }

        this.addToCart = this.addToCart.bind(this);
        this.remove = this.remove.bind(this);
    };
    
    addToCart (products){
        const {user} = this.props;
        // const newItem = {...product,quantity: 1}
        // const existingProduct = cart.filter(p => p.id === newItem.id);
        
        //     if (existingProduct.length > 0) {
        //         const updateUnit = existingProduct[0].unit + 1;
        //         const neww = {...existingProduct[0],unit:updateUnit}
        //         this.setState(prevState =>({
        //             cart: prevState.cart.concat(neww),
        //             // product: 239
        //         })) 

            // } else {
            // this.setState(prevState =>({
            //     cart: prevState.cart.concat(newItem),
            // })) 
        // }
            this.props.addToCart({
                        quantity: +1, total: products.price ,UserId: user.id, ProductId: products.id
            })
            console.log( products)
            console.log( products.price,products.id,user.id)
    }
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
        const {token, user} = this.props;
        return(
        <>
        <div className="products">
            {product && product.map((products) => (
                <div key={products.id} className="cards" onClick={() => this.props.selectProduct(products)}>
                    <div className='image-card'>
                        <img src={imag} alt="product"></img>
                    </div>
                    <div>
                        <NavLink to="/detail">
                            <h2>{products.name}</h2>
                        </NavLink>
                        <span>{products.price}</span>
                    </div>
                    <button onClick={()=>this.addToCart(products)}>Add to cart</button>
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