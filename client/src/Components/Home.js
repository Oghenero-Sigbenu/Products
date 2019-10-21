import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Header from "./Common/Header";
// import Banner from "../assets/file/banner1.jpg";
import Products from "./ProductCards";
import slide1 from "../assets/file/banner61.jpg";

//action
import { getProducts, setSelectedProduct } from "../store/actions/product";

import "../index.css"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    this.selectProduct = this.selectProduct.bind(this)
      }
    componentDidMount() {
        this.props.getProducts()
    };

    
  renderView() {
    const { view } = this.state;
    switch (view) {
      case 1:
        return (
          <>
           then, Add Payment Method... this is a one time action that help us in billing you based on your subscription.
          </>
        );
      case 2:
        return (
          <>
            Create a group or Join Group
          </>
        );
      case 3:
        return (
          <>
            Go into your group activity and get your netflix login details
        </>
        )
      default:
        return (
          <>
            <h3>How it works</h3>
            <p>Here is a brief process on ow to use this platform......</p>
            <p>Click on register to become a user</p>
          </>
        )
    }
  }

  prev = () => {
    const { view } = this.state;
    if (view < 1) {
      this.setState({
        view: 0
      })
    } else {
      this.setState({ view: view - 1 })
    }
  }

  next = () => {
    const { view } = this.state;
    if (view === 3) {
      this.setState({
        view: 0
      })
    } else {
      this.setState({ view: view + 1 })
    }
  };


  setNextImage = ()=>{
    const { view } = this.state;

    if(view >= 3){
      this.setState({
        view:0
      })
    }else{
      this.setState({
        view:view+1
      })
    }
  }

  selectProduct = (pro) => {
        this.props.setSelectedProduct(pro)
    };

    render() {
        const { product } = this.props;
        return (
            <div className="home">
                <Header />
                <div className="banner">
                    <img src={slide1} alt="banner" />
                </div>
                <div>
                    <h2>Recently Added Products</h2>
                    <Products product={product} selectProduct={this.selectProduct}/>
                </div>
            </div>
        )
    }
};

const mapStateTProps = (state) => {
    const { product } = state.products;
    return {
        product
    }
};
export default connect(mapStateTProps, { getProducts, setSelectedProduct })(Home);