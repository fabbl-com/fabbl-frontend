import { combineReducers } from "redux";
import userReducers from "./userReducers";
const rootReducer = combineReducers({
  auth: userReducers.userSignin || userReducers.userRegister || userReducers.setUser,
  messages: userReducers.getMessages
});

export default rootReducer;
