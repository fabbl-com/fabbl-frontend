import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_CHAT_LIST_USERS_REQUEST,
  GET_CHAT_LIST_USERS_SUCCESS,
  GET_CHAT_LIST_USERS_FAIL,
  SET_USER_MESSAGES_REQUEST,
  SET_USER_MESSAGES_SUCCESS,
  SET_USER_MESSAGES_FAIL
} from "../constants/messageActionTypes";

const initialState = {
  messages: [],
  error: null,
  loading: false,
  chatListUsers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
    case GET_CHAT_LIST_USERS_REQUEST:
    case SET_USER_MESSAGES_REQUEST:
      return { ...state, loading: true, messages: [] };
    case GET_MESSAGES_SUCCESS:
    case SET_USER_MESSAGES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        messages: [],
        loading: false,
        error: action.payload
      };
    case GET_CHAT_LIST_USERS_SUCCESS:
      return {
        ...state,
        chatListUsers: action.payload,
        loading: false,
        error: null
      };
    case GET_CHAT_LIST_USERS_FAIL:
      return {
        ...state,
        chatListUsers: [],
        loading: false,
        error: action.payload
      };
    case SET_USER_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
