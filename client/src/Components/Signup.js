import React, {Component} from "react";

class Signup extends Component {
    render(){
    return(
        <div>
            <form>
                <div>
                    <label>Full Name:</label>
                    <input type="text" placeholder="Email"/>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" placeholder="Phone"/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" placeholder="Email"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Password"/>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
    };
};

export default Signup;