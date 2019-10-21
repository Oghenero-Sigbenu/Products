import { GET_PRODUCTS,SET_SELECTED_PRODUCT, GET_PRODUCT_BY_ID } from "../actions/types";

const initial = {
  product: ""
}
export default (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return { 
        ...state,
         product: payload,
        isLoading: false
       };
    case GET_PRODUCT_BY_ID:
      return { 
        ...state,
         oneProduct: payload,
        isLoading: false
       };
       case SET_SELECTED_PRODUCT:
       return { ...state,
          selectedProduct: payload
        };
    default:
      return state;
  }
};
