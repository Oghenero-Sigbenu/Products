import React, { Component } from "react";
import { connect } from "react-redux";

//components
import Header from "./Common/Header";
// import Banner from "../assets/file/banner1.jpg";
import Products from "./ProductCards";

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

    selectProduct = (pro) => {
        this.props.setSelectedProduct(pro)
    };

    render() {
        const { product } = this.props;
        return (
            <div className="home">
                <Header />
                <div className="banner">
                    {/* <img src={Banner} alt="banner" /> */}
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