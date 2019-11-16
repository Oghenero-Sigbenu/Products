import axios from "../../utils/axios.base";
import {START,LOGOUT, LOGIN, LOGINFAILED, SIGNUPFAILED}  from "./types";


export const start = () => ({
    type: START,
    payload:{
        isloading: true
    }
  });

 export const loginSuccess =(token, userId, user,msg) => ({
    type: LOGIN,
    payload:{
        token,
        userId,
        user,
        msg
    }
 }); 

 export const logInFailed = (msg) => {
    return {
      type: LOGINFAILED,
      payload: msg
    }
  };
  
export const signupFailed = (msg) => {
    return {
      type: SIGNUPFAILED,
      payload: msg
    }
};

export const login = (authdata) => {
  console.log(authdata)
    return (dispatch) => {
        dispatch(start())
            axios.post("/auth/login", authdata)
                .then(res => {
                    const {user, token} = res.data;
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(user));
                            dispatch(loginSuccess(user, token))
                         })
                         .catch(err => {
                             dispatch(logInFailed(err.response.data))
                         })
    }
};

export const register = (authData) => {
  console.log(authData)
    return (dispatch) => {
        dispatch(start())
        axios.post("/user/register", authData)
            .then(res => {
                const { user, token } = res.data;
                console.log(res.data)
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(loginSuccess(user, token))
            })
            .catch(err => {
                dispatch(signupFailed(err))
                console.log(err)
            })
        }
};

export const logout = () => {
  return {
    type: LOGOUT
  }
};

