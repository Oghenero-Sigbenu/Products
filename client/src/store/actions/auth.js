import axios from "../../utils/axios.base";
import {START, AUTH_SUCCESS, AUTH_SUCCESS, LOGINFAILED, SIGNUPFAILED}  from "./types";


export const start = () => ({
    type: START,
    payload:{
        isloading: true
    }
  });

 export const loginSuccess =(token, userId, user) => ({
    type: AUTH_SUCCESS,
    payload:{
        token,
        userId,
        user
    }
 }); 

 export const logInFailed = (msg) => {
    return {
      type: LOGINFAILED,
      payload: msg.msg
    }
  };
  
  export const signupFailed = (msg) => {
    return {
      type: SIGNUPFAILED,
      payload: msg.msg
    }
  };

export const login = (authdata) => {
    return (dispatch) => {
        dispatch(start())
            axios.post("/v1/auth/create", authdata)
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
    axios.post("/v1/user/register", authData)
      .then(res => {
        // console.log(res.data)
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(loginSuccess(user, token))
      })
      .catch(err => {
        // dispatch(signupFailed(err.response.data))
        console.log(err.response)
      })
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  }
}