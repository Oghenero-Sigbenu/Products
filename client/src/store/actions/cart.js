import {ADD_TO_CART, GET_ALL_CART_ITEMS, GET_USER_CART_ITEM, GET_CART_ITEM_BY_ID} from "./types";
import axios from "../../utils/axios.base";

//add to cart
export const addToCartSuccess = (item) => {
    return{
        type: ADD_TO_CART,
        payload: item
    }
};

export const getAllCartItemsSuccess = (data) => {
    return{
        type: GET_ALL_CART_ITEMS,
        payload: data
    }
};

export const getOneItemSuccess = (data) => {
    return{
        type: GET_CART_ITEM_BY_ID,
        payload: data
    }
};


export const userCartItemSuccess = (item) => {
    return{
        type: GET_USER_CART_ITEM,
        payload: item.data
    }
};

export const addToCart = (cartItem) => {
    return (dispatch) => {
        axios.post("/cart/create", cartItem)
            .then(res => {
                dispatch(addToCartSuccess(res.data))
                console.log(res.data)
            })
            .catch(err => console.log("error creating cart"))
    }
};

export const getCart = (data) => {
    return (dispatch) => {
        axios.get("/cart/get")
            .then(res => {
                dispatch(getAllCartItemsSuccess(res.data))
            })
            .catch(err => console.log("error creating cart"))
}
};

export const getUserCart = (id) => {
    return (dispatch) => {
        axios.get(`/cart/user/${id}`)
            .then(res => {
                dispatch(userCartItemSuccess(res.data))
            })
            .catch(err => console.log("error Fetching cart", err))
}
}