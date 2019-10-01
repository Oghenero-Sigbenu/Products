import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ProductReducer from "./products";
import CartReducer from "./cart";

// you'll have to combine them to one reducer.
// That's what we are doing here.

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductReducer,
  cart: CartReducer
});

export default rootReducer;
