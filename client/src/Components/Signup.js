import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect} from "react-router-dom";

//components
import Input from "./Common/Input";
import Button from "./Common/Button";
import Header from "./Common/Header";
// import Alert from "./Common/Alert";
import Spinner from "./Common/Spinner";
import {validateForm} from "./Common/Validation";

import { reg, isValid } from "./Common/Validation";

//action
import {register} from "../store/actions/auth";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          email: "",
          phone: "",
          password: "",
           disable: true,
          show: true,
          errors: {
            name: "",
            phone: "",
            email: "",
            password: "",
          },
          hidden: true
    
        }
        this.handleChange = this.change.bind(this);
        this.click = this.click.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    
      };
    
      click = (e) => {
          e.preventDefault();
          if (validateForm(this.state)) {
              const { name, phone, email, password } = this.state;
              this.props.register({ name, email, phone, password })
              console.log(name, email, phone, password );
            }
        else {
          this.setState({
            errorMsg: 'All fields are required'
          })
        }
      };
    
      err = () => {
        this.setState({
          errorMsg: null
        })
      };
    
      toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      };

      change = (e) => {
        let { name, value } = e.target;
        let errors = this.state.errors;
        this.setState({ [name]: value, close: true });
    
        switch (name) {
          case "name":
            errors.name = value.length < 3 ? "Full Name is required" : "";
            break;
          case "email":
            errors.email = reg.test(value) ? "" : "Invalid Email address";
            break;
          case "phone":
            errors.phone = isValid(value) ? "" : "Invalid Phone number";
            break;
          case "password":
            errors.password = value.length < 6 ? "Password must be 8 characters long" : "";
            break;
          default:
        }
        this.setState({ errors, [name]: value }, () => {
        })
      };
    render(){
        const { errors, disable } = this.state;
        const {  isLoggedIn,isLoading } = this.props;
        // const messages = errorMsg || msg ? <Alert msg={msg ? msg : errorMsg} classStyle="red" close={this.err} /> : null;
    return(
        <>
        {isLoggedIn ? <Redirect to="/" /> : ""}
        <div style={{ width: '100%' }}>
            <Header/>
            {isLoading ? <Spinner /> :
            <div className="container">
              <h1 className="head">Register</h1>
              {/* {messages} */}
                    <Input type="text" label="Full Name:" name="name" handleChange={this.change} placeholder="Email"/>
                    <div className="error">{errors.name}</div>
                    <Input type="text" label="Phone Number:" name="phone" handleChange={this.change} placeholder="Phone"/>
                    <div className="error">{errors.phone}</div>
                    <label>Email:</label>
                    <Input type="text" name='email' handleChange={this.change} placeholder="Email"/>
                    <div className="error">{errors.email}</div>
                    <label>Password:</label>
                    <Input type="password" handleChange={this.change} name="password"  placeholder="Password"/>
                    <div className="error">{errors.password}</div>
                <Button onclick={this.click} disable={disable}>Register</Button>
            </div>
            }
        </div>
        </>
    )
    };
};

const mapStateToProps = (state) => {
    const {user, token, isLoggedIn, isLoading,msg} = state.auth;
        return{
            user,
            token,
            isLoading,
            isLoggedIn,
            msg
        }
}

export default connect (mapStateToProps, {register})(Signup);