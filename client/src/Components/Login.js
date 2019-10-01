import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect} from "react-router-dom"

//components
import Input from "./Common/Input";
import Button from "./Common/Button";
import Header from "./Common/Header";
// import Alert from "./Common/Alert";
import { reg, validateForm } from "./Common/Validation";

//action
import {login} from "../store/actions/auth";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          errors: {
            email: "",
            password: ""
          },
          errorMsg: "",
          close: false,
          redirectTo: "",
          hidden: true
        }
        this.handChange = this.handChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.err = this.err.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    };

handChange = (e) => {
    const { value, name } = e.target;
    const errors = this.state.errors;
    this.setState({
        [name]: value,
        close: false
    })
    switch (name) {
        case "email":
        errors.email = reg.test(value) ? "" : "Invalid Email address";
        break;
        case "password":
        errors.password = value.length < 6 ? "Password must be 6 characters long" : "";
        break;
        default:
    }
    this.setState({ errors, [name]: value }, () => {
    })
    };

handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { msg } = this.props
    if (validateForm(this.state) || (email && password)) {
      this.props.login({ email, password });
      this.setState({
        errorMsg: msg,
        close: true
      })
    } else {
      this.setState({
        errorMsg: "All fields are to be filled correctly and are required",
        close: true
      });
    }
  };
  err = () => {
    this.setState({
      errorMsg: null,
      msg: null,
      close: false
    })
  };
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
    render(){
        const { errors} = this.state;
        const { isLoggedIn} = this.props;
        // const messages = (errorMsg || msg) && close ? <Alert msg={errorMsg || msg} classStyle="red" close={this.err} /> : null;

        return(
            <>
            {isLoggedIn ? <Redirect to="/"/> : 
            <div>
                <Header/>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <Input type="text" name="email" handleChange={this.handChange} placeholder="Email" />
                    </div>
                    <div className="error">{errors.email}</div>
                    <div>
                        <label>Password:</label>
                        <Input type="password" name="password" handleChange={this.handChange} placeholder="Password" />
                    </div>
                    <div className="error">{errors.password}</div>
                    <Button>Login</Button>
                </form>
            </div>
            }
            </>
        );
    };
};

const mapStateToProps = (state) => {
    const { isLoggedIn, token, user, msg, isLoading} = state.auth
        return {
            isLoggedIn, token, user, msg, isLoading
        };
}
export default connect (mapStateToProps, {login})(Login);