import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from './Common/Header';

//action
import {getUserCart} from "../store/actions/cart"
class Cart extends Component {

  componentDidMount(){
    const {user} = this.props;
    this.props.getUserCart(user.id)
  }
  render() {
    const {item} = this.props;
    console.log(item)
    return (
      <>
        <Header />
        {/* {item && item.Product.map(prod => (
          <div key={prod.id}> */}
            {/* <h5>{item && item.Product.name}</h5> */}
          {/* </div>
        ))} */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.cart.item,
  user: state.auth.user
});

export default connect (mapStateToProps, {getUserCart})(Cart);
