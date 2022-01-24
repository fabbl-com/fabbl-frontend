import { combineReducers } from "redux";
import userReducers from "./userReducers";
const rootReducer = combineReducers({
  auth: userReducers.userSignin || userReducers.userRegister || userReducers.setUser
});

export default rootReducer;
