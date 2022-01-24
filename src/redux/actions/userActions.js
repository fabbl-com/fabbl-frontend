import Axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT
} from "../constants/userActionTypes";

export const register = (userId) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: userId });
  try {
    const { data } = await Axios.post("/auth/register", userId);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userId", JSON.stringify(data));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const login = (userId) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: userId });
  try {
    const { data } = await Axios.post("/auth/login", userId);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user });
    localStorage.setItem("userId", JSON.stringify(data));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("userId");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/signin";
};
