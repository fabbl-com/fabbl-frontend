import { combineReducers } from "redux";
import userReducers from "./userReducers";
import messageReducers from "./messageReducers";
import alertReducers from "./alertReducers";
const rootReducer = combineReducers({
  user: userReducers,
  messages: messageReducers,
  alert: alertReducers
});

export default rootReducer;
