import Axios from "axios";

import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAIL,
  SET_USER_MESSAGES
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

export const setUserMessages = (data) => async (dispatch) => {
  console.log(data?.messages);
  dispatch({ type: SET_USER_MESSAGES, payload: data });
};
