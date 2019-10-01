import axios from "../../utils/axios.base";
import {GETPRODUCTS, SETSELECTEDPRODUCT,GETPRODUCTSFAILED, START} from "./types";

export const start = () => ({
    type: START,
    payload:{
        isloading: true
    }
  });

  export const failed = (msg) => {
     return { 
      type: GETPRODUCTSFAILED,
      payload: msg
     }  
  };

  export const getProductsSuccess = (data) => {
    return{
        type: GETPRODUCTS,
        payload: data.data
    }
  };

  export const getProducts = () => {
    console.log("res.data")
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
  export const setSelectedProduct = (product) => {
    return {
      type: SETSELECTEDPRODUCT,
      payload: product,
    };
  };