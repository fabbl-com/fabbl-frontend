import { combineReducers } from "redux";
import userReducers from "./userReducers";
const rootReducer = combineReducers({
  auth: userReducers
});

export default rootReducer;
