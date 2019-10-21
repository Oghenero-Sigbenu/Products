import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

//components
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Product from "./Components/Product";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import Checkout from "./Components/checkout";

import './App.css';

class App extends Component {
  render(){
    let routes = (
      <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/product" component={Product}/>
        <Route path="/products/:id" exact component={ProductDetail}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Signup}/>
        <Route path="/" exact component={Home}/>
      </Switch>
    )
  return (
    <div className="App">
     {routes}
    </div>
  );
  }
}

export default App;
