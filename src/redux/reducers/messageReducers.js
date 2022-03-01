/* eslint-disable no-case-declarations */
import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_CHAT_LIST_USERS_REQUEST,
  GET_CHAT_LIST_USERS_SUCCESS,
  GET_CHAT_LIST_USERS_FAIL,
  SET_USER_MESSAGES,
  SET_USER_MESSAGES_REQUEST,
  SET_USER_MESSAGES_SUCCESS,
  SET_USER_MESSAGES_FAIL,
  SET_RANDOM_USERS_REQUEST,
  SET_RANDOM_USERS_SUCCESS,
  SET_RANDOM_USERS_FAIL,
  SET_USER_OFFLINE,
  SET_CHAT_LIST_USER_OFFLINE,
  SET_FRIENDS,
  SET_BLOCKED,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  DELETE_ALL_MESSAGES_SUCCESS
} from "../constants/messageActionTypes";

const initialState = {
  messages: [],
  error: null,
  loading: false,
  chatListUsers: [],
  randomUsers: [],
  isFriends: false,
  isBlockedBy: false,
  receiver: {},
  isDeleted: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
    case GET_CHAT_LIST_USERS_REQUEST:
    case SET_USER_MESSAGES_REQUEST:
    case SET_RANDOM_USERS_REQUEST:
      return { ...state, loading: true, messages: [], randomUsers: [] };
    case DELETE_MESSAGE_REQUEST:
      return { ...state, isDeleted: true };
    case GET_MESSAGES_SUCCESS:
    case SET_USER_MESSAGES_SUCCESS:
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    case GET_CHAT_LIST_USERS_SUCCESS:
      return {
        ...state,
        chatListUsers: action.payload,
        loading: false,
        error: null
      };
    case SET_RANDOM_USERS_SUCCESS:
      return {
        ...state,
        randomUsers: action.payload,
        loading: false,
        error: null
      };
    case GET_MESSAGES_FAIL:
    case GET_CHAT_LIST_USERS_FAIL:
    case SET_USER_MESSAGES_FAIL:
    case SET_RANDOM_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_USER_OFFLINE:
      return {
        ...state,
        receiver: {
          ...state.receiver,
          online: action.payload.connected,
          lastLogin: action.payload?.lastLogin
        }
      };
    case SET_CHAT_LIST_USER_OFFLINE:
      const temp = state.chatListUsers;
      console.log(temp, "temp");
      const index = temp.findIndex((el) => el.userId === action.payload.userId);
      temp[index].online = action.payload.connected;
      temp[index].lastLogin = action.payload.lastLogin;
      return {
        ...state,
        receiver: {
          ...state.receiver,
          chatListUser: temp
        }
      };
    case SET_FRIENDS:
      return {
        ...state,
        receiver: {
          ...state.receiver,
          isFriends: true
        }
      };
    case SET_BLOCKED:
      return {
        ...state,
        receiver: {
          ...state.receiver,
          isBlockedBy: action.payload.isBlockedBy
        }
      };
    default:
      return state;
  }
};
