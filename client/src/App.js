import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

//components
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";

import './App.css';

class App extends Component {
  render(){
    let routes = (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Signup}/>
        <Route path="/" exact component={Home}/>
      </Switch>
    )
  return (
    <div className="App">
     <h2>Hello</h2>
     {routes}
    </div>
  );
  }
}

export default App;
