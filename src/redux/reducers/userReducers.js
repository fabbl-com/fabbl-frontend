import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS
} from "../constants/userActionTypes";

const userRegister = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      window.location = "/";
      return { loading: false, userId: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userSignin = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      window.location = "/";
      return { loading: false, userId: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userReducers = {
  userRegister,
  userSignin
};

export default userReducers;
