import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

//action
import { setSelectedProduct } from "../store/actions/product";
import { addToCart } from "../store/actions/cart";
// import {login} from "../store/actions/auth";

import Button from "./Common/Button";
import Modal from "./Common/Modal";
class ProductCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            product: null,
            total: 20,
            show: true
        }
        this.addToCart = this.addToCart.bind(this);
        this.remove = this.remove.bind(this);
        this.navigate = this.navigate.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    };

    addToCart(products) {
        const { user } = this.props;
        this.setState({
            isShowing: true
        })
        this.props.addToCart({
            quantity: +1, total: products.price, UserId: user.id, ProductId: products.id
        })
    };
    navigate(path) {
        this.setState({
            show: false
        });
        setTimeout(() => {
           this.props.history.push(path);
        }, 500);
    };
    remove(products) {
        // const {cart} = this.state;
        // const newItem = {...product,unit:1}
        // this.setState(prevState =>({
        //     cart: prevState.cart.pop(newItem),
        //     // product: 239
        // }))
        // console.log(products)
    }
    openModal = () => {
        this.setState({
            isShowing: true
        })
    };

    closeModal = () => {
        this.setState({
            isShowing: false
        })
    };
    render() {
        const { product } = this.props;
        const { isShowing } = this.state;
        return (
            <>
                <div className="products">
                    {product && product.map((products) => (
                        <div className="cards" key={products.id}>
                            <NavLink to={`/products/${products.id}`}>
                                {/* <div className='image-card'> */}
                                <img src={`http://localhost:5000/${products.imgUrl}`} alt="product"></img>
                                {/* </div> */}
                            </NavLink>
                            <div className="cards-text">
                                <h4>{products.name}</h4>
                                <p>{products.name}</p>
                                <span>₦ {products.price}</span>
                            </div>
                            <Button onclick={() => this.addToCart(products)}>Add to cart</Button>
                        </div>
                    ))}
                    <Modal show={isShowing} handleClose={this.closeModal} open={this.openModal}>
                        <Button onclick={this.closeModal}>Continue shopping</Button>
                        <Button onclick={() => this.navigate("/cart")}>View cart & checkout</Button>
                    </Modal>
                </div>

            </>
        )
    };
};

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { setSelectedProduct, addToCart })(ProductCards);