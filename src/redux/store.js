import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  auth: {
    loading: false,
    userId: localStorage.getItem("userId") ? JSON.parse(localStorage.getItem("userId")) : null,
    error: null
  },
  messages: {
    loading: false,
    messages: [],
    error: null
  }
};

const composeEnhancer = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(middleware));
  }
  return applyMiddleware(middleware);
};

const store = createStore(rootReducer, initialState, composeEnhancer(thunk));

export default store;
