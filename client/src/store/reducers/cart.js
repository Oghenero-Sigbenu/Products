import {ADD_TO_CART, GET_ALL_CART_ITEMS, GET_USER_CART_ITEM, GET_CART_ITEM_BY_ID, REMOVE_ITEM_FROM_CART} from "../actions/types";


const initial = {
  cart: JSON.parse(localStorage.getItem('cart')),
  isLoading: true
  }
    export default (state = initial, action) => {
        const { type, payload } = action;
        switch (type) {
        case ADD_TO_CART:
            return { ...state,
                isSubmitting: false,
                created: true
            };
            case GET_ALL_CART_ITEMS:
            return { ...state,
                cart: payload,
           isLoading: false
            };
            case GET_USER_CART_ITEM:
            return { 
                ...state,
                item: payload,
                isLoading: false
            };
        default:
            return state;
    }
  };
  