import React, {Component} from "react";
import {connect} from "react-redux";

//components
import ProductCards from "./ProductCards";

//action
import {getProducts} from "../store/actions/product";

class Product extends Component{
    componentDidMount(){
        this.props.getProducts()
    }
    selectProduct = (product) => {
        this.props.setSelectedProduct(product)
    };
    render(){
        const {product} = this.props;
        console.log(product)
        return(
            <>
                <ProductCards product={product} selectProduct={this.selectProduct}/>
            </>
        );
    };
};

const mapStateToProps = (state) => ({
    product: state.products.product
});
export default connect(mapStateToProps, {getProducts})(Product);