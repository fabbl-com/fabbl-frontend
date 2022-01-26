import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  SET_USER,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL
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

const setUser = (state = {}, action) => {
  if (action.type === SET_USER) return { loading: false, userId: action.payload };
  return state;
};

const getMessages = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return { loading: true };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        messages: action.payload.messages
      };
    case GET_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userReducers = {
  userRegister,
  userSignin,
  setUser,
  getMessages
};

export default userReducers;
