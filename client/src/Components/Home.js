import React, { Component } from "react";
import { connect } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Header from "./Common/Header";
import Products from "./ProductCards";
import slide1 from "../assets/file/banner61.jpg";
import slide2 from "../assets/file/banner11.jpg";
import slide3 from "../assets/file/banner21.jpg";

//action
import { getProducts, setSelectedProduct } from "../store/actions/product";

import "../index.css"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
         view: 1

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
           <img src={slide1} alt="banner" />
          </>
        );
      case 2:
        return (
          <>
            <img src={slide2} alt="banner" />
          </>
        );
      case 3:
        return (
          <>
             <img src={slide3} alt="banner" />
        </>
        )
      default:
        return (
          <>
             <img src={slide2} alt="banner" />
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
        const slides = this.renderView();
        return (
            <div className="home">
                <Header />
                <div className="banner">
                    {slides}
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