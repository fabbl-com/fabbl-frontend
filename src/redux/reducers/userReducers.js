import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  SET_USER,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  EMAIL_VERIFY_REQUEST,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAIL,
  SET_LIKES_REQUEST,
  SET_LIKES_SUCCESS,
  SET_LIKES_FAIL
} from "../constants/userActionTypes";

const initialState = {
  error: {},
  isAuth: false,
  loading: false,
  likes: [],
  userInfo: {},
  isEmailVerified: false,
  userId: localStorage.getItem("userId")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_SIGNIN_REQUEST:
    case GET_ALL_USERS_REQUEST:
    case EMAIL_VERIFY_REQUEST:
    case SET_LIKES_REQUEST:
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
    case EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isEmailVerified: true,
        ...action.payload,
        error: null
      };
    case SET_LIKES_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload
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
    case EMAIL_VERIFY_FAIL:
      return {
        ...state,
        isEmailVerified: false,
        loading: false,
        error: action.payload
      };
    case SET_LIKES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        userId: action.payload
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        messagedUsers: [...action.payload]
      };
    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
