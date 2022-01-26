import { combineReducers } from "redux";
import userReducers from "./userReducers";
import messageReducers from "./messageReducers";
const rootReducer = combineReducers({
  user: userReducers
});

export default rootReducer;
