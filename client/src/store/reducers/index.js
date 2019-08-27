import { combineReducers } from "redux";

import authReducer from "./auth";

// you'll have to combine them to one reducer.
// That's what we are doing here.

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
