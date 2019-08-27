import React, {Component} from "react";

//components
import Input from "./Common/Input";
import Button from "./Common/Button";

class Login extends Component{
    render(){
        return(
            <div>
                <form>
                    <div>
                        <label>Email:</label>
                        <Input type="text" placeholder="Email"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <Input type="password" placeholder="Password"/>
                    </div>
                    <Button>Login</Button>
                </form>
            </div>
        );
    };
};

export default Login;