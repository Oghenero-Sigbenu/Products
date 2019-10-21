import {LOGIN, LOGOUT, LOGINFAILED, SIGNUPFAILED, START, UPDATEUSER } from "../actions/types";

const token = localStorage.getItem('token');
const checkToken = token != null ? true : false;

const INITIAL = {
  token,
  isLoggedIn: checkToken,
  user: JSON.parse(localStorage.getItem('user')),
  isLoading: false
}

export default (state = INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case START:
      return {
        ...state,
        isLoading: payload.isLoading
      }
    case LOGIN:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true,
        isLoading: false,
        msg:  payload.msg

      }
    case LOGINFAILED:
      return {
        ...state,
        msg: payload,
        isLoading: false
      }
    case SIGNUPFAILED:
      return {
        ...state,
        msg: payload,
        isLoading: false
      }
    case UPDATEUSER: 
      return {
        ...state, user: payload
      }
    case LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false

      }
    default:
      return state
  }
}
