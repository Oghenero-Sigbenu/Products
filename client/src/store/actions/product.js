import axios from "../../utils/axios.base";
import {GET_PRODUCTS, SET_SELECTED_PRODUCT,GET_PRODUCTS_FAILED,GET_PRODUCT_BY_ID, START} from "./types";

export const start = () => ({
    type: START,
    payload:{
        isloading: true
    }
  });

export const failed = (msg) => {
    return { 
    type: GET_PRODUCTS_FAILED,
    payload: msg
    }  
};

export const getProductsSuccess = (data) => {
  return{
      type: GET_PRODUCTS,
      payload: data.data
  }
};
export const getProductByIdSuccess = (data) => {
  return{
      type: GET_PRODUCT_BY_ID,
      payload: data.data
  }
};

export const getProducts = () => {
    return (dispatch) => {
        dispatch(start());
          axios.get("/products/get")
              .then(res => {
                  dispatch(getProductsSuccess(res.data))
                  console.log(res.data)
              })
              .catch(err => dispatch(failed(err.msg)))
    }
};
export const getProductById = (id) => {
  return (dispatch) => {
      dispatch(start());
          axios.get(`/products/${id}`)
              .then(res => {
                  dispatch(getProductByIdSuccess(res.data))
                  console.log(res.data)
              })
              .catch(err => dispatch(failed(err.msg)))
  }
};
export const setSelectedProduct = (product) => {
  return {
    type: SET_SELECTED_PRODUCT,
    payload: product,
  };
};