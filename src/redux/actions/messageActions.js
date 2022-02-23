import Axios from "axios";

import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_CHAT_LIST_USERS_SUCCESS,
  GET_CHAT_LIST_USERS_FAIL,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAIL,
  SET_USER_MESSAGES_REQUEST,
  SET_USER_MESSAGES_SUCCESS,
  SET_USER_MESSAGES_FAIL,
  SET_RANDOM_USERS_REQUEST,
  SET_RANDOM_USERS_SUCCESS,
  SET_RANDOM_USERS_FAIL,
  SET_USER_OFFLINE,
  SET_CHAT_LIST_USER_OFFLINE,
  SET_FRIENDS,
  SET_BLOCKED
} from "../constants/messageActionTypes";

export const getMessages = (sender, receiver) => async (dispatch) => {
  console.log(sender, receiver, "hello");
  dispatch({ type: GET_MESSAGES_REQUEST });
  try {
    const { data } = await Axios.get("/get-messages", { sender, receiver });
    console.log(data, "data");
    dispatch({ type: GET_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const getAllMessages = (sender, receiver) => async (dispatch) => {
  dispatch({ type: GET_ALL_MESSAGES_REQUEST });
  try {
    const { data } = await Axios.post("/user/get-messages", { sender, receiver });
    console.log(data, "data");
    dispatch({ type: GET_ALL_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_ALL_MESSAGES_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const getChatListUsers = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: GET_CHAT_LIST_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CHAT_LIST_USERS_FAIL, payload: error.message });
  }
};

export const setRandomUsers = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: SET_RANDOM_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_RANDOM_USERS_FAIL, payload: error });
  }
};

export const setUserMessages = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: SET_USER_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_USER_MESSAGES_FAIL, payload: error.message });
  }
};

export const setUserOffline = (data) => async (dispatch) => {
  dispatch({ type: SET_USER_OFFLINE, payload: data });
};

export const setChatListUserOffline = (data) => async (dispatch) => {
  dispatch({ type: SET_CHAT_LIST_USER_OFFLINE, payload: data });
};

export const setFriends = (data) => async (dispacth) => {
  dispacth({ type: SET_FRIENDS, payload: data });
};

export const setBlocked = (data) => async (dispacth) => {
  dispacth({ type: SET_BLOCKED, payload: data });
};
