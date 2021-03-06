import React, {Component} from 'react';
import {connect} from "react-redux";

//action
import {getUserCart} from "../store/actions/cart";

//components
import Button from './Common/Button';
import Header from './Common/Header';
import imag from "../assets/file/watch.jpg";

class Cart extends Component {
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

  total() {
    const {item} = this.props;
    console.log(item)
  }
  render() {
    const {item} = this.props;
    return (
      <>
        <Header />
        <div className="container cart-box">
        <div>
        <table>
            <tbody>
              <tr className="table-head"> 
                <th>Item</th>
                <th>Amount</th>
                <th>Quantity</th>
                <th>Sub-total</th>
              </tr>
          {item && item.products.map((prod, index) => {
                return (
                  <tr key={index} >
                    <td className="table-item">
                    <img src={imag} alt="product"></img>
                    {prod.product.name}
                    </td>
                    <td>{prod.product.price}</td>
                    <td>{prod.product.quantity}</td>
                    <td onClick={() => this.total()} >{prod.product.price}</td>
                    {/* // <td>{moment(elem.billingHistory).format('D MMM\'YY')}</td> */}
                    {/* <td>{eval([prod.product.price].join("+"))}</td> */}
                  </tr>
                );
              })}
            </tbody>
           
          </table>
            <Button onclick={() => this.navigate('/')}>Continue Shopping</Button>
            <Button onclick={() => this.navigate('/checkout')}>CheckOut Now</Button>
          </div> 
        </div> 
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.cart.item,
  user: state.auth.user
});

export default connect (mapStateToProps, {getUserCart})(Cart);

