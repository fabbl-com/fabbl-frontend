import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  SET_USER
} from "../constants/userActionTypes";

const initialState = {
  error: {},
  isAuth: false,
  loading: false,
  userInfo: {},
  userId: localStorage.getItem("userId")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
    case USER_SIGNIN_SUCCESS:
      localStorage.setItem("userId", action.payload.userId);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
        error: null
      };
    case USER_SIGNIN_FAIL:
    case USER_REGISTER_FAIL:
      localStorage.removeItem("userId");
      return {
        ...state,
        userInfo: {},
        isAuth: false,
        loading: false,
        error: action.payload
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    default:
      return state;
  }
};
