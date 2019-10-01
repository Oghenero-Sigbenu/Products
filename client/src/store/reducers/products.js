import { GETPRODUCTS,SETSELECTEDPRODUCT } from "../actions/types";

const initial = {
  product: ""
}
export default (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case GETPRODUCTS:
      return { 
        ...state,
         product: payload,
        isLoading: false
       };
       case SETSELECTEDPRODUCT:
       return { ...state,
          selectedProduct: payload
        };
    default:
      return state;
  }
};
