import React, { Component } from "react";
import {connect} from "react-redux";

//action
import {getUserCart} from "../store/actions/cart";

//components
import Header from "./Common/Header";
import Input from "./Common/Input";
import Button from "./Common/Button";
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: true
        }
        this.navigate = this.navigate.bind(this);
      };
    
    componentDidMount(){
        const {user} = this.props;
        this.props.getUserCart(user.id)
    }
    
    navigate(path) {
        this.setState({
            show: false
        });
        setTimeout(() => {
            this.props.history.push(path);
        }, 500);
        };
    render() {
        const {item} = this.props;
        return (
            <>
                <Header />
                <div className="checkout-box">
                    <h2>Checkout</h2>
                    <div className="checkout">
                        <div className="shipping-details">
                            <div className="carts-header">
                                <h2>Billing Address</h2>
                            </div>
                            <div className="form">
                                <div className="name">
                                    <div className="form-left">
                                        <Input type="text" name="first" label="First Name:" placeholder="John" />
                                    </div>
                                    <div className="form-right">
                                        <Input type="text" label="Last Name:" name="last" placeholder="Deo" />
                                    </div>
                                    {/* <div className="error">{errors.email}</div> */}
                                </div>
                                <Input type="text" label="Phone Number:" name="password" placeholder="08130176854" />
                                <div className="input">
                                    <label>Address:</label>
                                    <textarea className="txt" type="text" name="address" placeholder="Address" />
                                    {/* <div className="error">{errors.password}</div> */}
                                </div>
                                <Button>Place your Order</Button>
                            </div>
                        </div>
                        <div className="shipping-carts">
                            <div className="carts-header"><h3>Your Order</h3></div>
                            {item && item.products.map(prod => (
                            <div className="carts-card" key={prod.product.id}> 
                                <div className="cart-image"></div>
                                <div className="cart-text">
                                <div>
                                    <h5>{prod.product.name}</h5>
                                </div>
                                <div >
                                    <p>{prod.product.price}</p>
                                    <p>Qty: 1</p>
                                </div>
                                </div>
                            </div>
                            ))}
                            <div>
                                <div className="order">
                                    <span className="left">Subtotal</span>
                                    <span className="right">77777</span>
                                </div>
                                <div className="order">
                                    <span className="left">Total</span>
                                    <span className="right">76666</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

const mapStateToProps = (state) => ({
    item: state.cart.item,
    user: state.auth.user
  });
  
  export default connect (mapStateToProps, {getUserCart})(Checkout);